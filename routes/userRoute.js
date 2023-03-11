const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// routes
router.post('/signup',userController.signUp);
router.post('/signin',userController.signIn);
router.get('/signout',userController.signOut);
router.get('/refresh',userController.validateRefreshToken);

module.exports = router;