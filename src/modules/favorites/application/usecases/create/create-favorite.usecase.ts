import { Injectable, Logger } from '@nestjs/common';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

@Injectable()
export class CreateFavoriteUseCase {
  private readonly logger: Logger;

  constructor(private readonly favoriteService: FavoriteService) {
    this.logger = new Logger(CreateFavoriteUseCase.name);
  }

  async execute(input: FavoriteModel): Promise<FavoriteModel> {
    try {
      const existentProductToCustomer =
        await this.favoriteService.getByProductIdAndCustomerId(
          input.productId,
          input.customerId,
        );

      if (existentProductToCustomer) {
        throw new Error('Product already Favorite for this Customer');
      }

      return await this.favoriteService.save(input);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
