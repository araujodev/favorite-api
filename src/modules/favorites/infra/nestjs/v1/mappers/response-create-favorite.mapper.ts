import { CreateFavoriteResponseDto } from '../dto/create-favorite-response.dto';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

export class ResponseCreateFavoriteMapper {
  static toResponse(model: FavoriteModel): CreateFavoriteResponseDto {
    return {
      id: model.id,
      customer: {
        id: model.customer.id,
        name: model.customer.name,
      },
      product: {
        id: model.product.id,
        title: model.product.title,
        image: model.product.image,
        price: model.product.price,
        review: {
          rate: model.product.review?.rate,
          count: model.product.review?.count,
        },
      },
    } as CreateFavoriteResponseDto;
  }
}
