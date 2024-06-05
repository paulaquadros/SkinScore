const { Sequelize } = require('sequelize');
const config = require('./config/db-config.json');

const sequelize = new Sequelize(config.development);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize;
