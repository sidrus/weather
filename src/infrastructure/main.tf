provider "aws" {
  region = var.region
  profile = var.aws_profile
}

provider "aws" {
  alias = "aws_east1"
  region = "us-east-1"
  profile = var.aws_profile
}

locals {
  fqdn = "${var.subdomain_name}${var.env}.${var.domain_name}"
}

data "aws_route53_zone" "r53_zone" {
  name = var.domain_name
}

module "acm" {
  providers = {
    aws = aws.aws_east1
  }

  source  = "terraform-aws-modules/acm/aws"
  version = "2.14.0"

  domain_name = local.fqdn
  zone_id = data.aws_route53_zone.r53_zone.zone_id

  tags = {
    env = var.env
  }
}

module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "1.22.0"

  bucket = "${local.fqdn}-bucket"
  acl    = "private"

  versioning = {
    enabled = false
  }

  tags = {
    env = var.env
  }
}

module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "1.9.0"

  aliases = [local.fqdn]
  default_root_object = "index.html"
  is_ipv6_enabled = false
  wait_for_deployment = false
  price_class = "PriceClass_All"

  create_origin_access_identity = true
  origin_access_identities = {
    s3_bucket = "S3 Origin Access Identity for Cloudfront"
  }

  origin = {
    s3 = {
      domain_name = module.s3-bucket.this_s3_bucket_bucket_regional_domain_name
      s3_origin_config = {
        origin_access_identity = "s3_bucket" # key in `origin_access_identities`
      }
    }
  }

  default_cache_behavior = {
    target_origin_id       = "s3"
    viewer_protocol_policy = "allow-all"

    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD"]
    compress        = true
    query_string    = true
  }

  viewer_certificate = {
    acm_certificate_arn = module.acm.this_acm_certificate_arn
    ssl_support_method  = "sni-only"
  }

  tags = {
    env = var.env
  }
}

resource "aws_route53_record" "default" {
  name = local.fqdn
  type = "A"
  zone_id = data.aws_route53_zone.r53_zone.zone_id
  alias {
    evaluate_target_health = false
    name = module.cloudfront.this_cloudfront_distribution_domain_name
    zone_id = module.cloudfront.this_cloudfront_distribution_hosted_zone_id
  }
}
