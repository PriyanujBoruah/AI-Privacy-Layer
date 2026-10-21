terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. CloudWatch Log Group for Container Logs
resource "aws_cloudwatch_log_group" "gateway_logs" {
  name              = "/ecs/ai-privacy-core-${var.environment}"
  retention_in_days = 30

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

# 2. Private ECS Cluster
resource "aws_ecs_cluster" "cluster" {
  name = "ai-privacy-core-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

# 3. IAM Execution Role
resource "aws_iam_role" "execution_role" {
  name = "ai-privacy-core-execution-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "execution_policy" {
  role       = aws_iam_role.execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Task Role (for runtime AWS API calls if needed)
resource "aws_iam_role" "task_role" {
  name = "ai-privacy-core-task-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# 4. Security Groups
resource "aws_security_group" "alb" {
  name        = "ai-privacy-core-alb-${var.environment}"
  description = "Controls internal traffic to the AI Privacy Core ALB"
  vpc_id      = var.vpc_id

  ingress {
    description = "Internal HTTP ingress from within VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
  }

  egress {
    description = "Allow all outbound to ECS tasks"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

resource "aws_security_group" "ecs_tasks" {
  name        = "ai-privacy-core-tasks-${var.environment}"
  description = "Allows ingress only from internal ALB and egress for upstream frontier LLM APIs"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Allow HTTP traffic from ALB only"
    from_port       = 8787
    to_port         = 8787
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "Allow outbound HTTPS to OpenAI / Google / Azure frontier endpoints"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

# 5. Internal Application Load Balancer
resource "aws_lb" "internal" {
  name               = "ai-privacy-alb-${var.environment}"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.private_subnet_ids

  enable_deletion_protection = false

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

resource "aws_lb_target_group" "tg" {
  name        = "ai-privacy-tg-${var.environment}"
  port        = 8787
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = "/health"
    protocol            = "HTTP"
    port                = "8787"
    interval            = 15
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
    matcher             = "200"
  }

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.internal.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg.arn
  }
}

# 6. ECS Task Definition (Fargate)
resource "aws_ecs_task_definition" "task" {
  family                   = "ai-privacy-core-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = tostring(var.container_cpu)
  memory                   = tostring(var.container_memory)
  execution_role_arn       = aws_iam_role.execution_role.arn
  task_role_arn            = aws_iam_role.task_role.arn

  container_definitions = jsonencode([
    {
      name      = "ai-privacy-core"
      image     = var.container_image
      essential = true
      user      = "node"

      portMappings = [
        {
          containerPort = 8787
          hostPort      = 8787
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "PORT", value = "8787" },
        { name = "NODE_ENV", value = "production" },
        { name = "STORAGE_MODE", value = "memory_only" },
        { name = "OPENAI_BASE_URL", value = var.upstream_base_url }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.gateway_logs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      readonlyRootFilesystem = true
    }
  ])
}

# 7. ECS Service
resource "aws_ecs_service" "service" {
  name            = "ai-privacy-core-${var.environment}"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn
    container_name   = "ai-privacy-core"
    container_port   = 8787
  }

  depends_on = [aws_lb_listener.http]

  tags = {
    Environment = var.environment
    Application = "ai-privacy-core"
  }
}
