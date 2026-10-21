variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment name (e.g. production, staging)"
  type        = string
  default     = "production"
}

variable "vpc_id" {
  description = "Target VPC ID where the private ECS tasks and ALB will reside"
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for ECS Fargate tasks and internal ALB"
  type        = list(string)
}

variable "container_image" {
  description = "Docker container image URI"
  type        = string
  default     = "ghcr.io/priyanujboruah/ai-privacy-core:latest"
}

variable "container_cpu" {
  description = "CPU units for ECS Fargate task (256 = 0.25 vCPU, 512 = 0.5 vCPU, 1024 = 1 vCPU)"
  type        = number
  default     = 256
}

variable "container_memory" {
  description = "RAM in MB for ECS Fargate task (512, 1024, 2048)"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of active Fargate tasks running behind the internal load balancer"
  type        = number
  default     = 2
}

variable "upstream_base_url" {
  description = "Default upstream frontier LLM endpoint"
  type        = string
  default     = "https://api.openai.com/v1"
}
