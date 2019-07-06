const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// POST /api/v2/users
router.get('/', userController.getUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/delete-account/:id', userController.deleteAccount);

module.exports = router;
