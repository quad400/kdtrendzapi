import { AccountType, RolesEnum } from 'src/lib/common/enum/user.enum';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import { CartEntity } from 'src/res/cart/entity/cart.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ select: false })
  password: string;

  @Column({
    default:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
  })
  avatar: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    array: true,
    default: [RolesEnum.USER],
  })
  roles: RolesEnum[];

  @Column({ default: false })
  is_account_blocked: boolean;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.BUYER })
  account_type: AccountType;

  @Column({ nullable: true })
  verification_code: string;

  @Column({ nullable: true })
  verification_code_expires: Date;

  @OneToOne(() => BrandEntity, (brand) => brand.user)
  brand: BrandEntity;

  @OneToMany(()=> CartEntity, (cart)=> cart.user)
  carts: CartEntity[]
}
