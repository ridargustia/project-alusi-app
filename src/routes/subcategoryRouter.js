const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

//LIST ROUTER
router.get('/:id', subcategoryController.index);
router.post('/', subcategoryController.store);

module.exports = router;