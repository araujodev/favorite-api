import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteMapper } from '../mappers/favorite.mapper';
import { FavoriteEntity } from 'src/modules/favorites/domain/entities/favorite.entity';
import { FavoriteModel } from 'src/modules/favorites/domain/models/favorite.model';

export class FavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async removeById(favoriteId: number): Promise<void> {
    await this.favoriteRepository.delete({ id: favoriteId });
  }

  async getFavoritesByCustomerId(customerId: number): Promise<FavoriteModel[]> {
    const entities = await this.favoriteRepository.find({
      where: { customer: { id: customerId } },
      relations: ['product', 'customer'],
    });

    return entities.map((entity) => FavoriteMapper.toDomain(entity));
  }

  async save(favorite: FavoriteModel): Promise<FavoriteModel> {
    const toPersist = FavoriteMapper.toPersistence(favorite);
    const createdFavorite = await this.favoriteRepository.save(toPersist);
    const favoriteWithRelations = await this.favoriteRepository.findOne({
      where: { id: createdFavorite.id },
      relations: ['product', 'customer'],
    });

    if (!favoriteWithRelations) {
      throw new Error(
        `Dont retrive favorite for Product ${favorite.productId} and Customer ${favorite.customerId}`,
      );
    }

    return FavoriteMapper.toDomain(favoriteWithRelations);
  }

  async findByProductIdAndCustomerId(
    productId: number,
    customerId: number,
  ): Promise<FavoriteModel | null> {
    const entity = await this.favoriteRepository.findOne({
      where: {
        product: { id: productId },
        customer: { id: customerId },
      },
      relations: ['product', 'customer'],
    });

    if (!entity) {
      return null;
    }

    return FavoriteMapper.toDomain(entity);
  }
}
