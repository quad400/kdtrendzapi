import { BaseEntity } from 'src/lib/db/base-entity';
import { UserEntity } from 'src/res/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItemEntity } from './cart_item.entity';

@Entity('carts')
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE"
  })
  items: CartItemEntity[];

  @Column({ name: 'user_id', nullable: true })
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.carts, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_price: number;

}
