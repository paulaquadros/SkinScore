const axios = require('axios');
const Produto = require('../models/Produto');

const paginar = (modelo) => async (req, res, next) => {
  try {
    let { limite = 10, pagina = 1, ordenacao = 'id_produto:ASC' } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(':');

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = ordem.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    if (limite > 0 && pagina > 0) {
      const produtos = await modelo.findAll({
        order: [[campoOrdenacao, ordem]],
        offset: (pagina - 1) * limite,
        limit: limite,
      });

      const produtosComNota = await Promise.all(produtos.map(async (produto) => {
        try {
          const response = await axios.get(`http://3.145.180.184:3001/reviews/produto/${produto.id_produto}`); // Gambiarra braba
          const reviews = response.data;

          const totalNotas = reviews.reduce((acc, review) => acc + review.nota_estrelas, 0);
          const notaMedia = totalNotas / reviews.length;
          produto.dataValues.nota = notaMedia;
        } catch (error) {
          produto.dataValues.nota = '--';
        }
        return produto;
      }));

      res.status(200).json(produtosComNota);
    } else {
      res.status(400).json({ message: 'Limite e página devem ser maiores que 0.' });
    }
  } catch (erro) {
    next(erro);
  }
};

module.exports = paginar;
