import { CustomerEntity } from 'src/modules/customers/domain/entities/customer.entity';
import { FavoriteEntity } from 'src/modules/favorites/domain/entities/favorite.entity';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import { ProductReviewModel } from 'src/modules/products/domain/models/product-review.model';
import { ProductModel } from 'src/modules/products/domain/models/product.model';

export class FavoriteMapper {
  static toDomain(entity: FavoriteEntity): FavoriteModel {
    const model: FavoriteModel = {
      customerId: entity.customer.id,
      productId: entity.product.id,
      product: {
        id: entity.product.id,
        title: entity.product.title,
        image: entity.product.image,
        price: entity.product.price,
        review: {
          rate: Number(entity.product.reviewRate),
          count: Number(entity.product.reviewCount),
        } as ProductReviewModel,
      } as ProductModel,
      customer: entity.customer,
      id: entity.id,
    };
    return new FavoriteModel(model);
  }

  static toPersistence(model: FavoriteModel): FavoriteEntity {
    const entity = new FavoriteEntity();

    const product = new ProductEntity();
    product.id = model.productId;
    entity.product = product;

    const customer = new CustomerEntity();
    customer.id = model.customerId;
    entity.customer = customer;

    return entity;
  }
}
