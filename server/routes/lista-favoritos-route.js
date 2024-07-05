const express = require('express');
const listaFavoritosController = require('../controllers/lista-favoritos-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, listaFavoritosController.criarListaFavoritos);
router.post('/adicionar', authMiddleware, listaFavoritosController.adicionarProdutoLista);
router.get('/', authMiddleware, listaFavoritosController.obterListasFavoritos);
router.get('/:id', authMiddleware, listaFavoritosController.obterListaFavoritos);
router.put('/:id', authMiddleware, listaFavoritosController.editarListaFavoritos);
router.delete('/:id', authMiddleware, listaFavoritosController.excluirListaFavoritos);

module.exports = router;
