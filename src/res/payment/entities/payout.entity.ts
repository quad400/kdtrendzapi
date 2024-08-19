import { BaseEntity } from 'src/lib/db/base-entity';
import { BrandEntity } from 'src/res/brand/entities/brand.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payouts')
export class PayoutEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'brand_id' })
  brand_id: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.payouts)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'FAILED'] })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Column()
  transaction_id: string;
}
