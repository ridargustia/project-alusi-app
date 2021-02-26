const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//LIST ROUTER
router.get('/explore', productController.explore);
router.get('/:id', productController.index);
router.route('/')
    .post(productController.store)
    .get(productController.search);
router.get('/:id/detail', productController.show);

module.exports = router;