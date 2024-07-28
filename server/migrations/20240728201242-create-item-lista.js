'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_lista', {
      id_item_lista: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_lista_favoritos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lista_favoritos',
          key: 'id_lista_favoritos'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_produto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produtos',  // Nome da tabela de produtos
          key: 'id_produto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_lista');
  }
};
