const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const ListaFavoritos = sequelize.define('ListaFavoritos', {
  id_lista_favoritos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',  // Nome da tabela referenciada
      key: 'id_usuario'
    }
  },
  nome_lista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  privado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'lista_favoritos',
  timestamps: false
});

module.exports = ListaFavoritos;
