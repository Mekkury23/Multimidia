const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const checkRole = require('../../middleware/check-role');

const AccountController = require('../controllers/accountController');

router.get('/', checkAuth, checkRole('admin'), AccountController.fetchAllAccounts);

router.get('/:accountId', checkAuth, checkRole('admin'), AccountController.fetchAccountById);

router.patch('/:accountId', AccountController.updateAccount);

router.delete('/:accountId', AccountController.deleteAccount);

module.exports = router;