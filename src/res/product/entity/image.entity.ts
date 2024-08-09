import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity("images")
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}