import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { ProductReviewModel } from 'src/modules/products/domain/models/product-review.model';
import { ProductModel } from 'src/modules/products/domain/models/product.model';

export class ProductMapper {
  static toDomain(entity: ProductEntity): ProductModel {
    const model = {
      id: entity.id,
      externalId: entity.externalId,
      title: entity.title,
      image: entity.image,
      price: Number(entity.price),
      review: {
        rate: Number(entity.reviewRate),
        count: Number(entity.reviewCount),
      } as ProductReviewModel,
    };
    return new ProductModel(model);
  }

  static toPersistence(model: ProductModel): ProductEntity {
    const entity = new ProductEntity();
    entity.externalId = model.externalId;
    entity.title = model.title;
    entity.image = model.image;
    entity.price = model.price;
    entity.reviewRate = model.review?.rate;
    entity.reviewCount = model.review?.count;
    return entity;
  }
}
