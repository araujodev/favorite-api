import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './domain/entities/favorite.entity';
import { FavoritesController } from './infra/nestjs/v1/favorites.controller';
import { CreateFavoriteUseCase } from './application/usecases/create/create-favorite.usecase';
import { FavoriteService } from './application/services/favorite.service';
import { FavoriteRepository } from './infra/db/repositories/favorite.repository';
import { GetFavoriteListUseCase } from './application/usecases/get-favorites-list/get-favorite-list.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoritesController],
  providers: [
    CreateFavoriteUseCase,
    GetFavoriteListUseCase,
    FavoriteService,
    FavoriteRepository,
  ],
  exports: [],
})
export class FavoriteModule {}
