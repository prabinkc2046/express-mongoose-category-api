const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Category = require('./models/category');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const DEFAULT_PORT = 3000;
const DEFAULT_CONN= "mongodb://prabin:prabin@192.168.20.8:27017/categories";

if (process.env.NODE_ENV === "production"){
    dotenv.config();
}
const conn = process.env.CONN || DEFAULT_CONN
const PORT = process.env.PORT || DEFAULT_PORT

// Connect to MongoDb
mongoose.connect(conn);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> {
    console.log('Connected to MongoDB');
});

//api end point to retrive all items
app.get("/api/items", async(req, res)=>{
    try{
        const items = await Category.find();
        res.status(200).json({items});
    } catch(e){
        res.status(500).json({Error: e.message});
    }
})

//api end point to retrive the category of the item passed
app.get("/api/:item", async(req, res)=>{
    const {item} = req.params;
    const category = await Category.findOne({item: item});
    res.json({category});

})

// Start the server
app.listen(PORT, ()=>{
    console.log("Server is listening on port ", PORT);
})
















