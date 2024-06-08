const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/', userController.cadastrarUsuario);

router.get('/', userController.listarUsuarios);

router.get('/:id', userController.listarUmUsuario);

router.put('/:id', userController.atualizarUsuario);

router.delete('/:id', userController.deletarUsuario);

module.exports = router;
