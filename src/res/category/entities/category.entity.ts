import { ProductEntity } from 'src/res/product/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity("categories")
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, { onDelete: 'CASCADE' })
  parent: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.category)
  products:ProductEntity[];
}
