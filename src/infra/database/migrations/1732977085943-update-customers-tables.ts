import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    const tableDescription = await queryInterface.describeTable('bank_accounts');

    if (!tableDescription.customerId) {
      await queryInterface.addColumn('bank_accounts', 'customerId', {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  },

  down: async (queryInterface: QueryInterface) => {
    const tableDescription = await queryInterface.describeTable('bank_accounts');

    if (tableDescription.customerId) {
      await queryInterface.removeColumn('bank_accounts', 'customerId');
    }
  },
};
