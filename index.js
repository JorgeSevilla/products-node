'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 8686;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_products', { useNewUrlParser: true})
        .then(() => {
            console.log("It's works");

            app.listen(port, () => {
                console.log("Server running in http://localhost:" + port);
            });
        });