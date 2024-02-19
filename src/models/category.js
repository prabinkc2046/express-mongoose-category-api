const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    item: String,
    category: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;