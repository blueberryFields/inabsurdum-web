#!/bin/bash
systemctl stop docker containerd
tee /etc/docker/daemon.json << EOF
{
  "iptables": false
}
EOF
curl -fsSLO https://gist.github.com/goll/bdd6b43c2023f82d15729e9b0067de60/raw/nftables-docker.conf -o /etc/nftables-docker.conf && nft -f /etc/nftables-docker.conf
systemctl start docker