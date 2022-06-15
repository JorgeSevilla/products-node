"use strict";

var validator = require("validator");
var fs = require("fs");
var path = require("path");
var Product = require("../models/product");

const { get } = require("../routes/product");
const { exists } = require("../models/product");
const product = require("../models/product");

var controller = {
  test: (req, res) => {
    return res.status(200).send({
      title: "Products",
      author: "Jorge Sevilla",
    });
  },

  save: (req, res) => {
    //Collect post parameters
    var params = req.body;

    //Validate data
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_content = !validator.isEmpty(params.content);
    } catch (error) {
      return res.status(200).send({
        status: "error",
        message: "Missing data to send",
      });
    }

    if (validate_title && validate_content) {
      //Calidate object to save
      var product = new Product();

      //Assing values
      product.title = params.title;
      product.content = params.content;
      product.image = null;

      //Save the products
      product.save((erro, productStored) => {
        if (erro || !productStored) {
          return res.status(404).send({
            status: "error",
            message: "The product has not been saved",
          });
        }

        //return a answer
        return res.status(200).send({
          status: "success",
          product: productStored,
        });
      });
    } else {
      return res.status(200).send({
        status: "error",
        message: "The data is not valid",
      });
    }
  },

  getProducts: (req, res) => {
    var query = Product.find({});
    var last = req.params.last;

    if (last || last != undefined) {
      query.limit(1);
    }

    //Find
    query.sort("-_id").exec((err, products) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          message: "Error returning items",
        });
      }

      if (!products) {
        return res.status(400).send({
          status: "error",
          message: "There are no items to display",
        });
      }
      return res.status(200).send({
          status: 'success', 
          products
      });
    });
  }
}; //End controller

module.exports = controller;
