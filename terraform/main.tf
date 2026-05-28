terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "backend" {

  image  = "ubuntu-22-04-x64"

  name   = "timekeeper-backend"

  region = "sgp1"

  size   = "s-1vcpu-1gb"

  user_data = <<-EOF
              #!/bin/bash

              echo "root:${var.root_password}" | chpasswd

              sed -i 's/^#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

              sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

              systemctl restart ssh
              EOF
}

output "droplet_ip" {
  value = digitalocean_droplet.backend.ipv4_address
}