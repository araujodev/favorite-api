import { ApiProperty } from '@nestjs/swagger';
import { GetFavoriteResponseDto } from './get-favorite-response.dto';

export class GetFavoritesResponseDto {
  @ApiProperty({
    description: 'Favorites list',
    isArray: true,
    type: GetFavoriteResponseDto,
  })
  favorites: GetFavoriteResponseDto[];
}
