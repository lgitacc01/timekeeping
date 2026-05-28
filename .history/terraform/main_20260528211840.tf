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

resource "digitalocean_droplet" "backend" {

  image  = "ubuntu-22-04-x64"

  name   = "timekeeper-backend"

  region = "sgp1"

  size   = "s-1vcpu-1gb"

  ssh_keys = [

    data.digitalocean_ssh_key.default.id

  ]

}

output "droplet_ip" {

  value = digitalocean_droplet.backend.ipv4_address

}