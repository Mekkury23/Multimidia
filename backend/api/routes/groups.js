const express = require('express');
const router = express.Router();

const checkAuth = require('../../middleware/check-auth');
const checkRole = require('../../middleware/check-role');
const GroupController = require('../controllers/groupController');

router.get('/', checkAuth, GroupController.fetchAllGroups);

router.get('/:groupId', checkAuth, GroupController.fetchGroupById);

router.post('/', checkAuth, checkRole, GroupController.createGroup);

router.patch('/:groupId', checkAuth, checkRole, GroupController.updateGroup);

router.delete('/:groupId', checkAuth, checkRole, GroupController.deleteGroup);