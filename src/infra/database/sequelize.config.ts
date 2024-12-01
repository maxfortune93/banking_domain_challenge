import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

const getFilesRecursively = (directory: string): string[] => {
  const filesInDirectory = readdirSync(directory);
  return filesInDirectory.flatMap((file) => {
    const absolutePath = join(directory, file);
    return statSync(absolutePath).isDirectory()
      ? getFilesRecursively(absolutePath)
      : absolutePath;
  });
};

const loadAllModels = (): any[] => {
  const rootPath = process.env.NODE_ENV === 'production'
  ? join(__dirname, '../../../dist/src')
  : join(__dirname, '../../../src');
  const fileExtension = process.env.NODE_ENV !== 'development' ? '.js' : '.ts'; 

  const allFiles = getFilesRecursively(rootPath);
  
  return allFiles
    .filter((file) => file.endsWith(`.entity${fileExtension}`))
    .map((file) => {
      const model = require(file);
      const modelKey = Object.keys(model)[0];
      console.log(model[modelKey])
      return model[modelKey];
    });
};

// export const sequelizeConfig: SequelizeOptions = {
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   models: loadAllModels(),
//   logging: false,
// };

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
};
