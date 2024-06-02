const pool = require('../db');

exports.cadastrarProduto = async (req, res) => {
  const { nome, marca, descricao, ingredientes } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  if (!nome || !marca || !descricao || !ingredientes) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO produto (nome, ingredientes, descricao, marca, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, ingredientes, descricao, marca, imagem]
    );
    res.status(201).json({ message: 'Produto cadastrado com sucesso!', produto: result.rows[0] });
    console.log(`Produto Cadastrado com Sucesso.`);
  } catch (err) {
    console.error(err);
    console.log(`Erro ao cadastrar produto.`);
    res.status(500).json({ message: 'Erro ao cadastrar produto.' });
  }
};
