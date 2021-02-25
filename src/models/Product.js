const mongoose = require('mongoose');
const { Schema } = mongoose;
const random = require('ol-mongoose-random');

//BUAT SCHEMA
let productSchema = new Schema({
    place_id: {
        type: Schema.Types.ObjectId, ref: 'Place', required: true
    },
    category_id: {
        type: Schema.Types.ObjectId, ref: 'Category', required: true
    },
    subcategory_id: {
        type: Schema.Types.ObjectId, ref: 'Subcategory', required: true
    },
    name: {
        type: String, required: true,
    },
    price: {
        type: Number, required: true
    },
    description: {
        type: String, required: true
    },
    image: {
        type: String, default: 'default.jpg'
    },
    is_active: {
        type: Boolean, default: false
    },
    is_order: {
        type: Boolean, default: false
    },
    counter: {
        type: Number, default: 0
    },
    rating: {
        type: Number, default: 0
    }
}, {timestamps: true});

productSchema.plugin(random);

//INTEGRASI MODEL DENGAN SCHEMA
const Product = mongoose.model('Product', productSchema);

//EXPORTS MODUL
module.exports = Product;
