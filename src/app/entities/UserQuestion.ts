import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';

import User from './User';

@Entity('user_question')
@Unique(['user_id', 'date'])
export default class UserQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', default: 1 })
  date: number;

  @Column({ type: 'text' })
  data: string;

  @Column()
  user_id: number;

  @ManyToOne<User>(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
