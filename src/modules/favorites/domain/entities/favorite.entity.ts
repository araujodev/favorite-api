import { CustomerEntity } from 'src/modules/customers/domain/entities/customer.entity';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';
import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('favorites')
@Unique('uq_customer_product', ['customer', 'product'])
export class FavoriteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.favorites)
  @Index('idx_favorites_customer_id')
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => ProductEntity, (product) => product.favorites)
  @Index('idx_favorites_product_id')
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
