import { Injectable, Logger } from '@nestjs/common';
import { FavoriteService } from '../../services/favorite.service';

@Injectable()
export class RemoveFavoriteByProductAndCustomerUseCase {
  private readonly logger: Logger;

  constructor(private readonly favoriteService: FavoriteService) {
    this.logger = new Logger(RemoveFavoriteByProductAndCustomerUseCase.name);
  }

  async execute(productId: number, customerId: number): Promise<void> {
    try {
      const favoriteFound =
        await this.favoriteService.getByProductIdAndCustomerId(
          productId,
          customerId,
        );

      if (!favoriteFound) {
        throw new Error(
          `Dont retrive favorite for Product ${productId} and Customer ${customerId}`,
        );
      }

      await this.favoriteService.removeById(Number(favoriteFound.id));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
