const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.route('/:userId').get(userController.getUser);
router.route('/:userId/avatar').get(userController.getUserAvatar);
router.route('/:userId').delete(userController.deleteUserData);

module.exports = router;