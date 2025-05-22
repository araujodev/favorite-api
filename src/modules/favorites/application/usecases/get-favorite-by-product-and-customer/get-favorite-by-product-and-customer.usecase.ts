import { Injectable, Logger } from '@nestjs/common';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

@Injectable()
export class GetFavoriteByProductAndCustomerUseCase {
  private readonly logger: Logger;

  constructor(private readonly favoriteService: FavoriteService) {
    this.logger = new Logger(GetFavoriteByProductAndCustomerUseCase.name);
  }

  async execute(productId: number, customerId: number): Promise<FavoriteModel> {
    try {
      return await this.favoriteService.getFavoriteByProductIdAndCustomerId(
        productId,
        customerId,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
