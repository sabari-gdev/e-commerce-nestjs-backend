import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ecommerce-db',
  synchronize: true,
  username: 'PostgresAdmin',
  password: 'Admin2124',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  logging: false,
};

const dataSouce = new DataSource(dataSourceOptions);
dataSouce.initialize();
export default dataSouce;
