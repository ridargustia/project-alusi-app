const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verify = require('../middlewares/verifyToken');

//LIST ROUTER
router.get('/', verify, userController.index);

module.exports = router;