const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const ItemLista = sequelize.define('ItemLista', {
  id_item_lista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_lista_favoritos: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lista_favoritos',  // Nome da tabela referenciada
      key: 'id_lista_favoritos'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: 'produto',  // Nome da tabela referenciada
      key: 'id_produto'
    }
  }
}, {
  tableName: 'item_lista',
  timestamps: false
});

module.exports = ItemLista;
