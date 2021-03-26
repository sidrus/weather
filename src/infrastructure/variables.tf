variable "region" {
  description = "The region in which to create this resource"
  default = "us-east-2"
}

variable "aws_profile" {
  description = "The AWS profile to use for terraform API calls"
  default = "retro-dev"
}

variable "env" {
  description = "The deployment environment"
  default = "dev"
}

variable "domain_name" {
  description = "Domain name to use for this deployment"
  default = "brandonfrie.com"
}

variable "subdomain_name" {
  description = "Subdomain name to use for this deployment"
  default = "wx"
}
