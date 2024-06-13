const Review = require('../models/Review');

exports.cadastrarReview = async (req, res) => {
  const { id_usuario, id_produto, nota_estrelas, comentario, tipo_pele, alergia } = req.body;

  if (!id_usuario || !id_produto || !nota_estrelas || !comentario) {
    return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const review = await Review.create({ id_usuario, id_produto, nota_estrelas, comentario, tipo_pele, alergia });
    res.status(201).json({ message: 'Review cadastrada com sucesso!', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar review.' });
  }
};

exports.listarReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar reviews.' });
  }
};

exports.atualizarReview = async (req, res) => {
  const { id } = req.params;
  const { nota_estrelas, comentario, tipo_pele, alergia } = req.body;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    }

    review.nota_estrelas = nota_estrelas || review.nota_estrelas;
    review.comentario = comentario || review.comentario;
    review.tipo_pele = tipo_pele || review.tipo_pele;
    review.alergia = alergia || review.alergia;

    await review.save();
    res.status(200).json({ message: 'Review atualizada com sucesso!', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar review.' });
  }
};

exports.deletarReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    }

    await review.destroy();
    res.status(200).json({ message: 'Review deletada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar review.' });
  }
};

exports.listarReviewsPorProduto = async (req, res) => {
  const { id_produto } = req.params;

  try {
    const reviews = await Review.findAll({ where: { id_produto } });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'Nenhuma review encontrada para este produto.' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar reviews para o produto.' });
  }
};