import { BaseEntity } from "src/lib/db/base-entity";
import { ProductEntity } from "src/res/product/entity/product.entity";
import { UserEntity } from "src/res/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("brands")
export class BrandEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    name: string

    @Column({nullable: true})
    avatar?: string
    
    @Column({type: "varchar", nullable: true})
    description?: string

    @OneToMany(()=> ProductEntity, (product)=> product.brand)
    products: ProductEntity[]

    @Column({name: "user_id", nullable: false})
    user_id: string

    @OneToOne(()=> UserEntity, (user)=>user.id, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: UserEntity
}
