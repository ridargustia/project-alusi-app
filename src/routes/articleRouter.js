const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

//LIST ROUTER
router.route('/')                     //Route grup dengan parameter path/url route
    .get(articleController.index)
    .post(articleController.store);

module.exports = router;