const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const verify = require('../middlewares/verifyToken');

//LIST ROUTER
router.get('/', verify, listController.index);
router.post('/', listController.store);
router.get('/:idList/product/:idProduct', verify, listController.storeProduct);

module.exports = router;