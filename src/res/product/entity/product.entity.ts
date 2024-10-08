import { BaseEntity } from 'src/lib/db/base-entity';
import { CategoryEntity } from 'src/res/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import { ColorEntity } from 'src/res/color/entities/color.entity';
import { SizeEntity } from 'src/res/size/entities/size.entity';
import { CartItemEntity } from 'src/res/cart/entity/cart_item.entity';
import { OrderItemEntity } from 'src/res/order/entity/order_item.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  previous_price: number;

  @Column()
  stock: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: CategoryEntity;

  @OneToMany(() => ImageEntity, (image) => image.product, { cascade: true })
  images: ImageEntity[];

  @ManyToMany(() => ColorEntity, (color) => color.products, { cascade: true })
  @JoinTable()
  colors: ColorEntity[];

  @ManyToMany(() => SizeEntity, (size) => size.products, { cascade: true })
  @JoinTable()
  sizes: SizeEntity[];

  @Column({name: "brand_id", nullable: false})
  brand_id: string

  @ManyToOne(()=> BrandEntity, (brand)=> brand.products, {onDelete:"CASCADE"})
  @JoinColumn({name: "brand_id"})
  brand: BrandEntity

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
  cartItems: CartItemEntity[];  

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

}
