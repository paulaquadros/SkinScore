const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const secretKey = 'seria_melhor_ir_ver_o_pele';

exports.registrar = async (req, res) => {
  const { nome, nome_usuario, email, senha, tipo_usuario } = req.body;

  if (!nome || !nome_usuario || !email || !senha || !tipo_usuario) {
    return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { nome_usuario } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Nome de usuário já existe.' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({ nome, nome_usuario, email, senha: hashedSenha, tipo_usuario });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { nome_usuario, senha } = req.body;

  if (!nome_usuario || !senha) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { nome_usuario } });
    if (!usuario) {
      return res.status(400).json({ message: 'Nome de usuário ou senha incorretos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Nome de usuário ou senha incorretos.' });
    }

    const token = jwt.sign({ id: usuario.id, nome_usuario: usuario.nome_usuario }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};
