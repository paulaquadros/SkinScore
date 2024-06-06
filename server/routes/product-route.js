const express = require('express');
const multer = require('multer');
const productController = require('../controllers/product-controller');
const { isAdmin } = require('../middlewares/auth-middleware');

const router = express.Router();

// config para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', isAdmin, upload.single('imagem'), productController.cadastrarProduto);

router.get('/', productController.listarProdutos);

router.get('/search', productController.buscarProdutos);

router.get('/:id', productController.listarUmProduto);

router.put('/:id', isAdmin, upload.single('imagem'), productController.atualizarProduto);

router.delete('/:id', isAdmin, productController.deletarProduto);

module.exports = router;
