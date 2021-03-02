const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verify = require('../middlewares/verifyToken');

//LIST ROUTER
router.get('/explore', productController.explore);
router.get('/:id', productController.index);
router.route('/')
    .post(productController.store)
    .get(productController.search);
router.get('/:id/detail', productController.show);
router.get('/:id/listed', verify, productController.savedList);

module.exports = router;