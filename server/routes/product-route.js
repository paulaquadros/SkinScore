const express = require('express');
const multer = require('multer');
const productController = require('../controllers/product-controller');
const { isAdmin } = require('../middlewares/auth-middleware');

const router = express.Router();

// config para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', isAdmin, upload.single('imagem'), productController.cadastrarProduto);

module.exports = router;
