import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infra/database/type-orm.config';
import { CustomerModule } from './modules/customers/customer.module';
import { ProductModule } from './modules/products/product.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { AuthModule } from './common/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './common/auth/guards/basic-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    CustomerModule,
    ProductModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
  ],
})
export class AppModule {}
