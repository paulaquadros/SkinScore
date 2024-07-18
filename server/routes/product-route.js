const express = require('express');
const multer = require('multer');
const productController = require('../controllers/product-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const { isAdmin } = require('../middlewares/auth-middleware');
const paginar = require('../middlewares/paginar');
const Produto = require('../models/Produto');

const router = express.Router();

// config para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single('imagem'), productController.cadastrarProduto);

router.get('/', productController.listarProdutos, paginar(Produto));

router.get('/search', productController.buscarProdutos, paginar(Produto));

router.get('/filter', productController.filtrarProdutos);

router.get('/:id', productController.listarUmProduto);

router.put('/:id', authMiddleware, upload.single('imagem'), productController.atualizarProduto);

router.delete('/:id', authMiddleware, productController.deletarProduto);

module.exports = router;
