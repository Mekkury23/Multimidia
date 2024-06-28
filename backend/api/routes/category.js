const express = require('express');
const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const checkRole = require('../../middleware/check-role');
const CategoryController = require('../controllers/categoryController');

router.get('/', checkAuth, CategoryController.fetchAllCategories);

router.get('/:categoryId', checkAuth, CategoryController.fetchCategoryById);

router.post('/', checkAuth, checkRole('admin'), CategoryController.createCategory);

router.patch('/:categoryId', checkAuth, checkRole('admin'), CategoryController.updateCategory);

router.delete('/:categoryId', checkAuth, checkRole('admin'), CategoryController.deleteCategory);

