const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categories');

router.post('/', authMiddleware, categoryController.addCategory);
router.get('/', authMiddleware, categoryController.getCategories);
router.delete('/delete/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;