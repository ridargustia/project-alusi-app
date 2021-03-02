const mongoose = require('mongoose');
const { Schema } = mongoose;

//BUAT SCHEMA
const userSchema = new Schema({
    name: {
        type: String, required: true,
    },
    phone_number: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true, min: 6, max: 1024
    },
    role_user: {
        type: Number, default: 2
    },
    image: {
        type: String, default: 'default.jpg'
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Place'
    }],
    lists: [{
        type: Schema.Types.ObjectId, ref: 'List'
    }]
}, {timestamps: true});

//INTEGRASI MODEL DENGAN SCHEMA
const User = mongoose.model('User', userSchema);

//EXPORTS MODUL
module.exports = User;
