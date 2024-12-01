import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable('TestTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    column1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    column2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    column3: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await queryInterface.bulkInsert('TestTable', [
    {
      column1: 'Test Value 1',
      column2: 123,
      column3: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      column1: 'Test Value 2',
      column2: 456,
      column3: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable('TestTable');
};
