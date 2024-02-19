#!/bin/bash
# Script to install MongoDB 4.4 on Ubuntu 20.04 (Focal Fossa) and start the MongoDB service

# Add MongoDB public GPG key to apt
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

# Add MongoDB repository to the list of apt sources
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Update package index to ensure the latest package information is retrieved
apt update

# Download and install libssl1.1 package to satisfy MongoDB dependencies
wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# Install MongoDB packages
apt-get install -y mongodb-org

# Start MongoDB service
systemctl start mongod

# Enable MongoDB service to start automatically on system boot
systemctl enable mongod

