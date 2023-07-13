const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateUser = require('../utils/validateUser');

router.post('/signup', validateUser, authController.signup);
router.post('/signin', validateUser, authController.signin);

module.exports = router;
