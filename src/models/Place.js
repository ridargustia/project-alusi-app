const mongoose = require('mongoose');
const { Schema } = mongoose;
const random = require('ol-mongoose-random');

//BUAT SCHEMA
const placeSchema = new Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    name: {
        type: String, required: true,
    },
    phone_number: {
        type: String, required: true
    },
    address: {
        type: String, required: true
    },
    open_time: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    url_gmap: {
        type: String, required: true
    },
    is_open: {
        type: Boolean, default: false
    },
    is_close: {
        type: Boolean, default: false
    },
    is_off: {
        type: Boolean, default: false
    },
    counter: {
        type: Number, default: 0
    }
}, {timestamps: true});

placeSchema.plugin(random);

//INTEGRASI MODEL DENGAN SCHEMA
const Place = mongoose.model('Place', placeSchema);

//EXPORTS MODUL
module.exports = Place;
