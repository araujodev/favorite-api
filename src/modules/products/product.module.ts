import { Module } from '@nestjs/common';
import { ProductsController } from './infra/nestjs/v1/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { GetProductsUseCase } from './application/usecases/get-products/get-products.usecase';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './infra/db/repositories/product.repository';
import { ImportProductService } from './application/services/import-product.service';
import { ProductsFakestoreConnector } from './infra/connectors/fakestore-api/products-fakestore.connector';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), HttpModule],
  controllers: [ProductsController],
  providers: [
    GetProductsUseCase,
    ProductService,
    ProductRepository,
    ImportProductService,
    ProductsFakestoreConnector,
  ],
  exports: [],
})
export class ProductModule {}
