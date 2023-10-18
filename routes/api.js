const express = require('express');
const router = express.Router();
const Product = require('../models/products');

//get all products 
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//get all products by id
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

//add new product
router.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

//update product by id
router.put('/products/:id', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedProduct);
});

//remove product by id
router.delete('/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndRemove(req.params.id);
  res.json(deletedProduct);
});

//remove all products
router.delete('/products', async (req, res) => {
  await Product.deleteMany();
  res.json({ message: 'All products removed' });
});

//find all published products
router.get('/products/published', async (req, res) => {
  const publishedProducts = await Product.find({ published: true });
  res.json(publishedProducts);
});

//find all products which name contains ‘kw’
router.get('/product', async (req, res) => {
  const keyword = req.query.name;
  const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
  res.json(products);
});

module.exports = router;
