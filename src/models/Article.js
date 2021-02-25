const mongoose = require('mongoose');
const { Schema } = mongoose;
const random = require('ol-mongoose-random');

//BUAT SCHEMA
let articleSchema = new Schema({
    title: {
        type: String, required: true,
    },
    content: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    image: {
        type: String, default: 'default.jpg'
    }
}, {timestamps: true});

articleSchema.plugin(random);

//INTEGRASI MODEL DENGAN SCHEMA
const Article = mongoose.model('Article', articleSchema);

//EXPORTS MODUL
module.exports = Article;
