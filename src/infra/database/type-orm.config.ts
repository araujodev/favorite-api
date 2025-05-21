import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const sqliteConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: false,
  entities: ['**/*.entity{.ts,.js}'],
  manualInitialization: true,
};

const postgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_CONNECTION_STRING'),
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  logging: configService.get<string>('DATABASE_LOG') === 'true',
  migrationsTableName: configService.get<string>('DATABASE_MIGRATION_TABLE'),
});

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return configService.get<string>('DATABASE_USE_SQLITE_CONNECTION') === 'true'
    ? sqliteConfig
    : postgresConfig(configService);
};
