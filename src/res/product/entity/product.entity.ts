import { BaseEntity } from 'src/lib/db/base-entity';
import { CategoryEntity } from 'src/res/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import { ColorEntity } from 'src/res/color/entities/color.entity';
import { SizeEntity } from 'src/res/size/entities/size.entity';

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

  @ManyToOne(()=> BrandEntity, (brand)=> brand.products)
  brand: BrandEntity
}
