const express = require('express');
const reviewController = require('../controllers/review-controller');

const router = express.Router();

router.post('/', reviewController.cadastrarReview);

router.get('/', reviewController.listarReviews);

router.put('/:id', reviewController.atualizarReview);

router.delete('/:id', reviewController.deletarReview);

module.exports = router;
