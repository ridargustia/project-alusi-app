const mongoose = require('mongoose');
const { Schema } = mongoose;

//BUAT SCHEMA
const categorySchema = new Schema({
    name: {
        type: String, required: true,
    }
}, {timestamps: true});

//INTEGRASI MODEL DENGAN SCHEMA
const Category = mongoose.model('Category', categorySchema);

//EXPORTS MODUL
module.exports = Category;
