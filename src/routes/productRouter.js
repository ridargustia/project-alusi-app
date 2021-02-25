const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//LIST ROUTER
router.get('/:id', productController.index);
router.post('/', productController.store);

module.exports = router;