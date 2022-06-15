'use strict'

var express = require('express');
var ProductController = require('../controllers/product');

var router = express.Router();

var multipart = require('connect-multiparty');

//Test routes
router.post('/test', ProductController.test);

//Routes of the application
router.post('/save', ProductController.save);

module.exports = router;