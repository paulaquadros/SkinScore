const { Sequelize, Op } = require('sequelize');
const Produto = require('../models/Produto');
const Review = require('../models/Review');
const axios = require('axios');

exports.cadastrarProduto = async (req, res) => {
  const { nome, marca, descricao, ingredientes } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  if (!nome || !marca || !descricao || !ingredientes) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const produto = await Produto.create({ nome, marca, descricao, ingredientes, imagem });
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', produto });
    console.log(`Produto Cadastrado com Sucesso.`);
  } catch (err) {
    console.error(err);
    console.log(`Erro ao cadastrar produto.`);
    res.status(500).json({ message: 'Erro ao cadastrar produto.' });
  }
};

exports.listarProdutos = async (req, res, next) => {
  req.resultado = Produto;
  next();
};

exports.listarUmProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    try {
      const response = await axios.get(`http://3.145.180.184:3001/reviews/produto/${id}`); // Não façam isso no seu trabalho
      const reviews = response.data;

      const totalNotas = reviews.reduce((acc, review) => acc + review.nota_estrelas, 0);
      const notaMedia = reviews.length > 0 ? totalNotas / reviews.length : -1;
      produto.dataValues.nota = notaMedia;
    } catch (error) {
      produto.dataValues.nota = -1;
    }

    res.status(200).json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar produto.' });
  }
};

exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, marca, descricao, ingredientes } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    produto.nome = nome || produto.nome;
    produto.marca = marca || produto.marca;
    produto.descricao = descricao || produto.descricao;
    produto.ingredientes = ingredientes || produto.ingredientes;
    produto.imagem = imagem || produto.imagem;

    await produto.save();
    res.status(200).json({ message: 'Produto atualizado com sucesso!', produto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    await produto.destroy();
    res.status(200).json({ message: 'Produto deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};

exports.buscarProdutos = async (req, res) => {
  const { termo } = req.query;

  if (!termo) {
    return res.status(400).json({ message: 'Termo de busca é obrigatório.' });
  }

  try {
    const produtos = await Produto.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.iLike]: `%${termo}%` } },
          { marca: { [Op.iLike]: `%${termo}%` } },
          { descricao: { [Op.iLike]: `%${termo}%` } },
          { ingredientes: { [Op.iLike]: `%${termo}%` } },
        ],
      },
      include: {
        model: Review,
        attributes: ['nota_estrelas', 'comentario', 'tipo_pele', 'alergia'],
      },
    });

    if (produtos.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado.' });
    }

    const resultados = produtos.map(produto => ({
      id: produto.id_produto,
      nome: produto.nome,
      marca: produto.marca,
      descricao: produto.descricao,
      ingredientes: produto.ingredientes,
      imagem: produto.imagem ? produto.imagem.toString('base64') : null,
      reviews: produto.Reviews.map(review => ({
        nota_estrelas: review.nota_estrelas,
        comentario: review.comentario,
        tipo_pele: review.tipo_pele,
        alergia: review.alergia,
      })),
    }));

    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

  exports.filtrarProdutos = async (req, res) => {
    const { marca, descricao, ingredientes } = req.query;
    
    try {
      let whereClause = {};
      
      if (marca) {
        whereClause.marca = { [Op.iLike]: `%${marca}%` };
      }

      if (ingredientes) {
        whereClause.ingredientes = { [Op.iLike]: `%${ingredientes}%` };
      }
      
      if (descricao) {
        whereClause.descricao = { [Op.iLike]: `%${descricao}%` };
      }
  
      const produtosFiltrados = await Produto.findAll({
        where: whereClause,
        include: {
          model: Review,
          attributes: ['nota_estrelas', 'comentario', 'tipo_pele', 'alergia']
        }
      });
      
      if (produtosFiltrados.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado.' });
      }
  
      const resultados = produtosFiltrados.map(produto => ({
        id: produto.id_produto,
        nome: produto.nome,
        marca: produto.marca,
        descricao: produto.descricao,
        ingredientes: produto.ingredientes,
        imagem: produto.imagem ? produto.imagem.toString('base64') : null,
        reviews: produto.Reviews.map(review => ({
          nota_estrelas: review.nota_estrelas,
          comentario: review.comentario,
          tipo_pele: review.tipo_pele,
          alergia: review.alergia
        }))
      }));
  
      res.status(200).json(produtosFiltrados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao filtrar produtos.' });
    }
  };  