// controllers/product-controller.js

const Produto = require('../models/Produto');

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
