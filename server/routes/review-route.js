const express = require('express');
const multer = require('multer');
const reviewController = require('../controllers/review-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', authMiddleware, upload.single(), reviewController.cadastrarReview);

router.get('/', authMiddleware,  reviewController.listarReviews);

router.get('/produto/:id_produto', authMiddleware, reviewController.listarReviewsPorProduto);

router.put('/:id', authMiddleware, reviewController.atualizarReview);

router.delete('/:id', authMiddleware, reviewController.deletarReview);

module.exports = router;
