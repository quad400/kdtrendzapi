import { BaseEntity } from 'src/lib/db/base-entity';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  commission_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  payment_refrence: string;


  @Column({name: "brand_id"})
  brand_id: string

  @ManyToOne(() => BrandEntity, (brand) => brand.payments, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'FAILED', 'CASHOUT'] })
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CASHOUT';
}
