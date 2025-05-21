import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { ProductModel } from 'src/modules/products/domain/models/product.model';
import { ProductMapper } from '../mappers/product.mapper';

export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(): Promise<ProductModel[]> {
    const entities = await this.productRepository.find();

    if (!entities || entities.length === 0) {
      return [];
    }

    return entities.map((entity) => ProductMapper.toDomain(entity));
  }

  async getByExternalId(externalId: number): Promise<ProductModel | null> {
    const entity = await this.productRepository.findOne({
      where: { externalId },
    });

    if (!entity) {
      return null;
    }

    return ProductMapper.toDomain(entity);
  }

  async save(product: ProductModel): Promise<ProductModel> {
    const toPersist = ProductMapper.toPersistence(product);
    const createdProduct = await this.productRepository.save(toPersist);
    return ProductMapper.toDomain(createdProduct);
  }
}
