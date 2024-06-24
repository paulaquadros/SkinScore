const express = require('express');
const authController = require('../controllers/auth-controller');
const indexController = require('../controllers/index-controller');

const router = express.Router();

router.get('/login', indexController.index);
router.get('/registrar', indexController.index);
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

module.exports = router;