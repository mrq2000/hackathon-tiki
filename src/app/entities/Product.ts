import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('products')
export default class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', default: 0 })
  discount_rate: number;

  @Column({ type: 'int' })
  rating_average: number;

  @Column({ type: 'varchar' })
  img_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
