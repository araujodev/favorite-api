import { GetFavoriteResponseDto } from '../dto/get-favorite-response.dto';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

export class ResponseGetFavoriteMapper {
  static toResponse(model: FavoriteModel): GetFavoriteResponseDto {
    return {
      id: model.id,
      productId: model.product.id,
      title: model.product.title,
      image: model.product.image,
      price: model.product.price,
      ...(model.product.review && {
        review: {
          rate: model.product.review.rate,
          count: model.product.review.count,
        },
      }),
    } as GetFavoriteResponseDto;
  }
}
