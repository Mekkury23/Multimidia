const express = require('express');
const mongoose = require('mongoose');
const process = require('../../nodemon.json');
const router = express.Router();

const AuthController = require('../controllers/authController');

router.post('/forgot', AuthController.forgotPwd);

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

module.exports = router;