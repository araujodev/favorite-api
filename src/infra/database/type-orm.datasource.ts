import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const configs: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_CONNECTION_STRING,
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  logging: process.env.DATABASE_LOG === 'true',
  migrationsTableName: process.env.DATABASE_MIGRATION_TABLE,
  synchronize: false,
};
const AppDataSource = new DataSource(configs);

export default AppDataSource;
