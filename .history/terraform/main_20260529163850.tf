terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "default" {
  name = "CICD_build_droplets"
}

# ======================
# VPC (optional nhưng ăn điểm)
# ======================
resource "digitalocean_vpc" "main" {
  name     = "timekeeper-vpc"
  region   = "sgp1"
  ip_range = "10.10.0.0/16"
}

# ======================
# LB DROPLET
# ======================
resource "digitalocean_droplet" "lb" {
  image  = "ubuntu-22-04-x64"
  name   = "lb-nginx"
  region = "sgp1"
  size   = "s-1vcpu-1gb"

  ssh_keys = [data.digitalocean_ssh_key.default.id]

  vpc_uuid = digitalocean_vpc.main.id
}

# ======================
# APP 1
# ======================
resource "digitalocean_droplet" "app1" {
  image  = "ubuntu-22-04-x64"
  name   = "app-1"
  region = "sgp1"
  size   = "s-1vcpu-1gb"

  ssh_keys = [data.digitalocean_ssh_key.default.id]

  vpc_uuid = digitalocean_vpc.main.id
}

# ======================
# APP 2
# ======================
resource "digitalocean_droplet" "app2" {
  image  = "ubuntu-22-04-x64"
  name   = "app-2"
  region = "sgp1"
  size   = "s-1vcpu-1gb"

  ssh_keys = [data.digitalocean_ssh_key.default.id]

  vpc_uuid = digitalocean_vpc.main.id
}

# ======================
# OUTPUT
# ======================
output "lb_ip" {
  value = digitalocean_droplet.lb.ipv4_address
}

output "app1_ip" {
  value = digitalocean_droplet.app1.ipv4_address
}

output "app2_ip" {
  value = digitalocean_droplet.app2.ipv4_address
}