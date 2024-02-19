## git clone
git clone https://github.com/prabinkc2046/express-mongoose-category-api.git
## set up mongo db server
cd express-mongoose-category-api
sudo chmod +x setup-mongodb.sh 
sudo ./setup-mongodb.sh
## create user and database 
use admin
switched to db admin
> use categories;
switched to db categories
> db.createUser(
... {
... user: "example",
... pwd: "example",
... roles: [{role: "readWrite", db: "categories"}]
... }
... );

## set up node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm --version
0.39.1

nvm install v20.10.0

node --version
v20.10.0

npm --version
10.2.3

## install dependencies
npm install --only=production



## create .env file in the same directory as createItems.js

CONN=mongodb://user:password@127.0.0.1:27017/database

## create collections
run this to create collections 
by changing:
Make sure to change:
const category = "Meat And Poultry"

// set the path to file containing items
const filePath = "./categories/meatAndPoultry.txt";

node createItems.js 
## set up service file
[Unit]
Description=My Node.js application
After=network.target

[Service]
Environment="NODE_ENV=production"
WorkingDirectory=/home/react/express-mongoose-category-api
ExecStart=/home/react/.nvm/versions/node/v20.10.0/bin/node src/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target

sudo systemctl daemon-reload 
sudo systemctl start node.service 
sudo systemctl enable node.service


