import { BaseEntity } from 'src/lib/db/base-entity';
import { ProductEntity } from 'src/res/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity("sizes")
export class SizeEntity  extends BaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique: true})
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.sizes)
  products: ProductEntity[];
}
