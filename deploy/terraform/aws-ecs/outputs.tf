output "internal_alb_dns" {
  description = "Internal DNS name of the Application Load Balancer. Point your applications and OpenAI SDKs to http://<dns_name>/v1"
  value       = aws_lb.internal.dns_name
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.cluster.name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.service.name
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group for gateway container telemetry"
  value       = aws_cloudwatch_log_group.gateway_logs.name
}
