const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
// const verify = require('../middlewares/verifyToken');

//LIST ROUTER
router.get('/explore', placeController.explore);
router.get('/:id', placeController.index);
router.route('/')
    .post(placeController.store)
    .get(placeController.search);
router.get('/:id/detail', placeController.show);

module.exports = router;