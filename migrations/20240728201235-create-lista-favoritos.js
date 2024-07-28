'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lista_favoritos', {
      id_lista_favoritos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',  // Nome da tabela de usuários
          key: 'id_usuario'
        }
      },
      nome_lista: {
        type: Sequelize.STRING,
        allowNull: false
      },
      privado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lista_favoritos');
  }
};
