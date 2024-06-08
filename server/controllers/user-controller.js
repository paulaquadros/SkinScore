const Usuario = require('../models/Usuario');

exports.cadastrarUsuario = async (req, res) => {
    const { nome, nome_usuario, email, senha, tipo_usuario } = req.body;
  
    if (!nome || !nome_usuario || !email || !senha || !tipo_usuario) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }
  
    try {
      const usuarioExistente = await Usuario.findOne({ where: { nome_usuario } });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Nome de usuário já existe.' });
      }
  
      const usuario = await Usuario.create({ nome, nome_usuario, email, senha, tipo_usuario });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
    }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar usuarios.' });
  }
};

exports.listarUmUsuario = async (req, res) => {
    const { id } = req.params;

    try {
      const usuarios = await Usuario.findByPk(id);
      res.status(200).json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao listar usuario.' });
    }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, nome_usuario, email, senha, tipo_usuario } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario não encontrado.' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.nome_usuario = nome_usuario || usuario.nome_usuario;
    usuario.email = email || usuario.email;
    usuario.senha = senha || usuario.senha;
    usuario.tipo_usuario = tipo_usuario || usuario.tipo_usuario

    await usuario.save();
    res.status(200).json({ message: 'Usuario atualizado com sucesso!', usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuario.' });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario não encontrado.' });
    }

    await usuario.destroy();
    res.status(200).json({ message: 'Usuario deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuario.' });
  }
};