import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['dist/res/**/*.entity{.ts,.js}'],
  migrations: ['dist/lib/db/migrations/*{.ts,.js}'],
  logging: false,
  synchronize: process.env.IS_PRODUCTION === 'true',
  extra: {
    trustServerCertificate: true,
  },
  ssl: true,
};


const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
