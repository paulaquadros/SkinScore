const paginar = (modelo) => async (req, res, next) => {
    try {
      let { limite = 10, pagina = 1, ordenacao = 'id_produto:ASC' } = req.query;
      let [campoOrdenacao, ordem] = ordenacao.split(':');
  
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = ordem.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
      if (limite > 0 && pagina > 0) {
        const resultadoPaginado = await modelo.findAll({
          order: [[campoOrdenacao, ordem]],
          offset: (pagina - 1) * limite,
          limit: limite,
        });
  
        res.status(200).json(resultadoPaginado);
      } else {
        res.status(400).json({ message: 'Limite e página devem ser maiores que 0.' });
      }
    } catch (erro) {
      next(erro);
    }
  };
  
  module.exports = paginar;
  