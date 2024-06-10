const express = require('express');
const multer = require('multer');
const reviewController = require('../controllers/review-controller');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single(), reviewController.cadastrarReview);

router.get('/', reviewController.listarReviews);

router.put('/:id', reviewController.atualizarReview);

router.delete('/:id', reviewController.deletarReview);

module.exports = router;
