const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
// const verify = require('../middlewares/verifyToken');

//LIST ROUTER
router.get('/:id', placeController.index);
router.post('/', placeController.store);

module.exports = router;