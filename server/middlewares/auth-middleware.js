const pool = require('../db');

// usuario para teste
const TEST_ADMIN_USER_ID = 1;

const isAdmin = async (req, res, next) => {
  const userId = TEST_ADMIN_USER_ID;

  try {
    const result = await pool.query('SELECT tipo_usuario FROM usuario WHERE id_usuario = $1', [userId]);
    if (result.rows.length === 0 || result.rows[0].tipo_usuario !== 'A') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem cadastrar produtos.' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao verificar o tipo de usuário.' });
  }
};

module.exports = { isAdmin };
