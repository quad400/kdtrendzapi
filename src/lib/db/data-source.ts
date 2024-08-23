import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

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
  ssl: process.env.IS_PRODUCTION === 'true',
};


const dataSource = new DataSource(dataSourceOptions);

export default dataSource;