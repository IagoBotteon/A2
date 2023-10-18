const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = require('./models/products');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


const newProduct = new Product({
  name: 'Product1',
  description: 'Product Description.',
  price: 10.00,
  quantity: 1,
  category: 'Category1'
});

// newProduct.save(() => {
//   console.log('Saved.');
// });

app.get('/api/products', (req, res) => {
  Product.find({}, (err, products) => {
    if (!err) {
      res.json(products);
    }
  });
});

app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const updateData = { price: 29.99 };

  Product.findByIdAndUpdate(productId, updateData, (err, product) => {
    if (!err) {
      res.json(product);
    }
  });
});

app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId, (err, product) => {
    if (!err) {
      res.json(product);
    }
  });
});
