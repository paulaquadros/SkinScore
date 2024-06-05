const Usuario = require('../models/Usuario');

// usuario para teste
const TEST_ADMIN_USER_ID = 1;

const isAdmin = async (req, res, next) => {
  const userId = TEST_ADMIN_USER_ID;

  try {
    const usuario = await Usuario.findByPk(userId);
    if (!usuario || usuario.tipo_usuario !== 'A') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem cadastrar produtos.' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao verificar o tipo de usuário.' });
  }
};

module.exports = { isAdmin };
