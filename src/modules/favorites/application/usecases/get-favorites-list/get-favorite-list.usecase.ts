import { Injectable, Logger } from '@nestjs/common';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

@Injectable()
export class GetFavoriteListUseCase {
  private readonly logger: Logger;

  constructor(private readonly favoriteService: FavoriteService) {
    this.logger = new Logger(GetFavoriteListUseCase.name);
  }

  async execute(customerId: number): Promise<FavoriteModel[]> {
    try {
      return await this.favoriteService.getFavoritesFromCustomer(customerId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
