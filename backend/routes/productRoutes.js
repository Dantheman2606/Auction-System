const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, productController.createProduct);

module.exports = router;