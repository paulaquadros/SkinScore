const express = require('express');
const listaFavoritosController = require('../controllers/lista-favoritos-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.get('/favoritos/usuario/:id_usuario', listaFavoritosController.obterListasPublicasDeUsuario);
router.post('/', authMiddleware, listaFavoritosController.criarListaFavoritos);
router.post('/adicionar', authMiddleware, listaFavoritosController.adicionarProdutoLista);
router.delete('/remover/:id_lista_favoritos/:id_produto', authMiddleware, listaFavoritosController.removerProdutoLista);
router.get('/', authMiddleware, listaFavoritosController.obterListasFavoritos);
router.get('/:id_lista_favoritos', authMiddleware, listaFavoritosController.obterListaFavoritos);
router.put('/:id_lista_favoritos', authMiddleware, listaFavoritosController.editarListaFavoritos);
router.delete('/:id_lista_favoritos', authMiddleware, listaFavoritosController.excluirListaFavoritos);
router.get('/favoritos/usuario/:id_usuario/lista/:id_lista_favoritos', listaFavoritosController.obterListaPublicaEspecifica);

module.exports = router;
