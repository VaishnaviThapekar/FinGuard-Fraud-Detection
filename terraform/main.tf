# main.tf
# Terraform Configuration to provision production-grade AWS infrastructure for FinGuard AI

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

# 1. VPC & Networking
resource "aws_vpc" "finguard_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "finguard-vpc"
    Environment = "production"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.finguard_vpc.id
  tags = {
    Name = "finguard-igw"
  }
}

# Subnets
resource "aws_subnet" "public_1" {
  vpc_id            = aws_vpc.finguard_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
  map_public_ip_on_launch = true
  tags = {
    Name = "finguard-public-1"
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.finguard_vpc.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name = "finguard-private-1"
  }
}

# 2. EKS (Elastic Kubernetes Service) Cluster
resource "aws_eks_cluster" "eks" {
  name     = "finguard-eks-cluster"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.public_1.id, aws_subnet.private_1.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy
  ]
}

# IAM Role for EKS Cluster
resource "aws_iam_role" "eks_role" {
  name = "finguard-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_role.name
}

# 3. RDS PostgreSQL DB Instance
resource "aws_db_instance" "postgres" {
  identifier           = "finguard-postgres-db"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.medium"
  db_name              = "finguard_prod"
  username             = "finguard_admin"
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = false

  vpc_security_group_ids = [aws_security_group.db_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnets.name
}

resource "aws_db_subnet_group" "db_subnets" {
  name       = "finguard-db-subnet-group"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.public_1.id]
}

resource "aws_security_group" "db_sg" {
  name        = "finguard-db-security-group"
  description = "Allow inbound postgres traffic from private subnets"
  vpc_id      = aws_vpc.finguard_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.finguard_vpc.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Variables
variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "db_password" {
  type      = string
  sensitive = true
  default   = "SuperSecurePassword123"
}
