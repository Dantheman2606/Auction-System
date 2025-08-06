const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, productController.createProduct);

const getProductById = require('../controllers/products/getProductbyId');
router.get('/:id', authMiddleware,getProductById);

module.exports = router;