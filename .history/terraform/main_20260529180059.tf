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

variable "do_token" {}

data "digitalocean_ssh_key" "default" {
  name = "CICD_build_droplets"
}

# =========================
# APP 1
# =========================
resource "digitalocean_droplet" "app1" {
  image    = "ubuntu-22-04-x64"
  name     = "timekeeper-app1"
  region   = "sgp1"
  size     = "s-1vcpu-2gb"
  ssh_keys = [data.digitalocean_ssh_key.default.id]
}

# =========================
# APP 2
# =========================
resource "digitalocean_droplet" "app2" {
  image    = "ubuntu-22-04-x64"
  name     = "timekeeper-app2"
  region   = "sgp1"
  size     = "s-1vcpu-2gb"
  ssh_keys = [data.digitalocean_ssh_key.default.id]
}

# =========================
# LOAD BALANCER
# =========================
resource "digitalocean_droplet" "lb" {
  image    = "ubuntu-22-04-x64"
  name     = "timekeeper-lb"
  region   = "sgp1"
  size     = "s-1vcpu-1gb"
  ssh_keys = [data.digitalocean_ssh_key.default.id]
}

# =========================
# OUTPUT
# =========================
output "app1_ip" {
  value = digitalocean_droplet.app1.ipv4_address
}

output "app2_ip" {
  value = digitalocean_droplet.app2.ipv4_address
}

output "lb_ip" {
  value = digitalocean_droplet.lb.ipv4_address
}