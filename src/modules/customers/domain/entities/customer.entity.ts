import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: false, type: 'varchar', length: 255 })
  name: string;

  @Column({
    name: 'email',
    nullable: false,
    type: 'varchar',
    length: 150,
    unique: true,
  })
  @Index('idx_customers_email')
  email: string;

  @Column({
    name: 'document',
    nullable: true,
    type: 'varchar',
    length: 11,
    unique: true,
  })
  @Index('idx_customers_document')
  document?: string;
}
