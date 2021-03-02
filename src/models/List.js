const mongoose = require('mongoose');
const { Schema } = mongoose;

//BUAT SCHEMA
const listSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    title: {
        type: String, required: true
    },
    products: [{
        type: Schema.Types.ObjectId, ref: 'Product'
    }]
}, {timestamps: true});

//INTEGRASI MODEL DENGAN SCHEMA
const List = mongoose.model('List', listSchema);

//EXPORTS MODUL
module.exports = List;