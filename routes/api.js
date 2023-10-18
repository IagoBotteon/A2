const express = require('express');
const router = express.Router();
const Product = require('../models/products');

exports.getHomePage = (req, res) => {
  res.json({ message: "Welcome" });
};

exports.getAllProducts = (req, res) => {
  Product.find().then((data) => {
    res.json(data);
  });
};

exports.getSpecifiedProduct = (req, res) => {
  Product.findOne({ _id: req.params.id }).then((data) => {
    res.json(data);
  });
};

exports.postProduct = (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  const product = new Product({
    name,
    description,
    price,
    quantity,
    category,
  });

  product.save().then(() => {
    res.redirect('/api/products');
  });
};

exports.editProduct = (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  Product.findOne({ _id: req.params.id }).then((product) => {
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.category = category;

    product.save().then(() => {
      res.redirect('/api/products');
    });
  });
};

exports.deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect('/api/products');
  });
};

exports.deleteAllProduct = (req, res) => {
  Product.deleteMany({}).then(() => {
    res.redirect('/api/products');
  });
};

exports.getProductBySearch = (req, res) => {
  Product.findOne({ name: req.params.name }).then((data) => {
    res.json({ data });
  });
};
