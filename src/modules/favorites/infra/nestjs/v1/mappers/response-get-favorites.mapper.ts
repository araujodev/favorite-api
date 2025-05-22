import { GetFavoriteResponseDto } from '../dto/get-favorite-response.dto';
import { GetFavoritesResponseDto } from '../dto/get-favorites-response.dto';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

export class ResponseGetFavoritesMapper {
  static toResponse(models: FavoriteModel[]): GetFavoritesResponseDto {
    return {
      favorites: models.map((model) => {
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
      }),
    } as GetFavoritesResponseDto;
  }
}
