import { ProductModel } from 'src/modules/products/domain/models/product.model';
import { FakeStoreProductResponseDto } from '../dto/fakestore-products-response.dto';
import { ProductReviewModel } from 'src/modules/products/domain/models/product-review.model';

export class ProductFakeStoreMapper {
  static toDomain(response: FakeStoreProductResponseDto): ProductModel {
    return {
      externalId: response.id,
      title: response.title,
      image: response?.image ?? '',
      price: Number(response.price),
      review: {
        rate: response.rating?.rate,
        count: response.rating?.count,
      } as ProductReviewModel,
    };
  }
}
