const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./Usuario');
const ItemLista = require('./ItemLista');

const ListaFavoritos = sequelize.define('ListaFavoritos', {
  id_lista_favoritos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
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

ListaFavoritos.hasMany(ItemLista, { foreignKey: 'id_lista_favoritos' });
ItemLista.belongsTo(ListaFavoritos, { foreignKey: 'id_lista_favoritos' });

module.exports = ListaFavoritos;
