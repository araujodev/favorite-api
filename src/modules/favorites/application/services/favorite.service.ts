import { Injectable, Logger } from '@nestjs/common';
import { FavoriteRepository } from '../../infra/db/repositories/favorite.repository';
import { FavoriteModel } from '../../domain/models/favorite.model';

@Injectable()
export class FavoriteService {
  private readonly logger: Logger;

  constructor(private readonly favoriteRepository: FavoriteRepository) {
    this.logger = new Logger(FavoriteService.name);
  }

  async getFavoritesFromCustomer(customerId: number): Promise<FavoriteModel[]> {
    try {
      return await this.favoriteRepository.getFavoritesByCustomerId(customerId);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getByProductIdAndCustomerId(
    productId: number,
    customerId: number,
  ): Promise<FavoriteModel | null> {
    try {
      return await this.favoriteRepository.findByProductIdAndCustomerId(
        productId,
        customerId,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async save(favorite: FavoriteModel): Promise<FavoriteModel> {
    try {
      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
