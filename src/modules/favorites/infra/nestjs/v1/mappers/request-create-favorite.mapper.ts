import { CreateFavoriteProductToCustomerRequest } from '../dto/create-favorite-product-to-customer-request.dto';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

export class RequestCreateFavoriteMapper {
  static toDomain(
    dto: CreateFavoriteProductToCustomerRequest,
    customerId: number,
  ): FavoriteModel {
    return {
      customerId: Number(customerId),
      productId: Number(dto.productId),
    } as FavoriteModel;
  }
}
