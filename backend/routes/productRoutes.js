const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductAnalytics
} = require('../controllers/productController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(auth, getProducts)
  .post(auth, createProduct);

router.route('/:id')
  .get(auth, getProductById)
  .put(auth, updateProduct)
  .delete(auth, deleteProduct);

router.get('/analytics', auth, getProductAnalytics);

module.exports = router;