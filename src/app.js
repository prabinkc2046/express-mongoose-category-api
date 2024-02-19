const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Category = require('./models/category');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Change this in production environment
if (process.env.NODE_ENV === "production"){
    dotenv.config();
}
const conn = process.env.CONN;
const PORT = process.env.PORT;

// Connect to MongoDb
mongoose.connect(conn);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> {
    console.log('Connected to MongoDB');
});


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
















