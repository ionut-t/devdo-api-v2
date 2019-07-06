const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// POST /api/v2/users
// router.get('/', userController.getUsers); // for testing only
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/delete-account/:id', checkAuth, userController.deleteAccount);

module.exports = router;
