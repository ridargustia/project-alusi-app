const express = require('express');
const app = express();
const { config } = require('./src/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/userRouter');
const authRouter = require('./src/routes/authRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const subcategoryRouter = require('./src/routes/subcategoryRouter');
const placeRouter = require('./src/routes/placeRouter');
const articleRouter = require('./src/routes/articleRouter');
const productRouter = require('./src/routes/productRouter');
const listRouter = require('./src/routes/listRouter');


//MIDDLEWARES
app.use(bodyParser.json());

//KONFIGURASI MONGODB
mongoose.connect(config.db_url, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', () => console.log('DB connection error'));
db.once('open', () => console.log('DB connection successful'));

//ROUTE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/subcategories', subcategoryRouter);
app.use('/api/v1/places', placeRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/lists', listRouter);

//MENJALANKAN SERVER
app.listen(config.port, () => {
    console.log(`App listening on http://localhost:${config.port}`);
})