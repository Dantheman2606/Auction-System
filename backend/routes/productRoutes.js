const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', authMiddleware, productController.getProductById);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.get('/', authMiddleware, productController.getProducts);

module.exports = router;