const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const ListaFavoritos = require('./ListaFavoritos');
const Produto = require('./Produto');

const ItemLista = sequelize.define('ItemLista', {
  id_item_lista: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_lista_favoritos: {
    type: DataTypes.INTEGER,
    references: {
      model: ListaFavoritos,
      key: 'id_lista_favoritos'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto,
      key: 'id_produto'
    }
  }
}, {
    tableName: 'item_lista',
    timestamps: false
});

Produto.hasMany(ItemLista, { foreignKey: 'id_produto' });
ItemLista.belongsTo(Produto, { foreignKey: 'id_produto' });

module.exports = ItemLista;
