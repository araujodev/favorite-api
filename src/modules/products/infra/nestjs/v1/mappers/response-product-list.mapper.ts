import { ProductItemResponseDto } from '../dto/product-item-response.dto';
import { ProductModel } from 'src/modules/products/domain/models/product.model';
import { ProductListResponseDto } from '../dto/product-list-response.dto';

export class ResponseProductListMapper {
  static toResponse(models: ProductModel[]): ProductListResponseDto {
    return {
      products: models.map(
        (model) =>
          ({
            id: model.id,
            title: model.title,
            image: model.image,
            price: model.price,
            review: model.review,
          }) as ProductItemResponseDto,
      ),
    };
  }
}
