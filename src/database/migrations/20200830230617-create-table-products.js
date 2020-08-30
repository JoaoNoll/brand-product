

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('products', {
      uid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      brand_uid: {
        type: Sequelize.UUID,
        references: {
          model: 'brands',
          key: 'uid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('products');
  },
};
