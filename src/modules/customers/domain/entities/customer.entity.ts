import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  email: string;

  @Column({
    name: 'document',
    nullable: true,
    type: 'varchar',
    length: 11,
    unique: true,
  })
  document?: string;
}
