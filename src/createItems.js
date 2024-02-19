const mongoose = require('mongoose');
const fs = require('fs');
const readLine = require('readline');
const Category = require("./models/category")

// set the category
const category = "Fresh Produce"

// set the path to file containing items
const filePath = "./categories/freshProduces.txt";

// connection string
conn="mongodb://prabin:prabin@192.168.20.8:27017/categories";

// function to read lines and create array using each item line
const readFileByLine = (fileName)=>{
    return new Promise((resolve, reject)=>{
        const lines = [];
        const fileStream = fs.createReadStream(fileName);
        const rl = readLine.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        rl.on('line', (line)=>{
            lines.push(line)
        });

        rl.on('close', ()=>{
            resolve(lines);
        });

        rl.on('error', (error)=>{
            reject(error);
        });
    })
}

// function that creates an item in Fresh Produce collection
const createItem = async(item) => {
    try {
        // set the category
        const itemToCreate = {
            item: item.toLowerCase(),
            category: category.toLocaleLowerCase()
        };
        const savedItem = new Category(itemToCreate);
        await savedItem.save();
        console.log("Item saved", savedItem);
    }
    catch(error){
        console.log("Error while creating an item", error.message);
    }
};


// Connect to mongo Db
mongoose.connect(conn);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', async()=>{
   try{
        // read file line by line
         const lines = await readFileByLine(filePath);
         await Promise.all(lines.map(line => createItem(line)));
         console.log("All items created");
   } catch(error){
        console.log("Error while creating item", error.message);
   } finally{
        mongoose.connection.close();
        console.log("database is closed");
   }
})
