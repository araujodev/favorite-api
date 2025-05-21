import { FavoriteEntity } from 'src/modules/favorites/domain/entities/favorite.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'external_id', nullable: false, type: 'int' })
  @Index('idx_products_external_id')
  externalId: number;

  @Column({ name: 'title', nullable: false, type: 'varchar', length: 255 })
  @Index('idx_products_title')
  title: string;

  @Column({
    name: 'image',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  image: string;

  @Column({
    name: 'price',
    nullable: false,
    type: 'decimal',
  })
  price: number;

  @Column({
    name: 'review_rate',
    nullable: true,
    type: 'decimal',
  })
  reviewRate?: number;

  @Column({
    name: 'review_count',
    nullable: true,
    type: 'int',
  })
  reviewCount?: number;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorites: FavoriteEntity[];
}
