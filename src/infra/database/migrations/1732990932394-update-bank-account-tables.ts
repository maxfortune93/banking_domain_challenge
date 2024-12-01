import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    
    await queryInterface.addConstraint('financial_transactions', {
      fields: ['sourceAccountId'],
      type: 'foreign key',
      name: 'fk_source_account',
      references: {
        table: 'bank_accounts',
        field: 'uuid',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('financial_transactions', {
      fields: ['targetAccountId'],
      type: 'foreign key',
      name: 'fk_target_account',
      references: {
        table: 'bank_accounts',
        field: 'uuid',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeConstraint('financial_transactions', 'fk_source_account');

    await queryInterface.removeConstraint('financial_transactions', 'fk_target_account');

  },
};
