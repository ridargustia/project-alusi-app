const mongoose = require('mongoose');
const { Schema } = mongoose;

//BUAT SCHEMA
let subcategorySchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId, ref: 'Category', required: true
    },
    name: {
        type: String, required: true,
    },
    image: {
        type: String, default: 'default.jpg'
    }
}, {timestamps: true});

//INTEGRASI MODEL DENGAN SCHEMA
const Subcategory = mongoose.model('Subcategory', subcategorySchema);

//EXPORTS MODUL
module.exports = Subcategory;
