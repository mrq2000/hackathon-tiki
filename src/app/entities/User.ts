import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserStatus } from '../enums/user';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 31, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 127 })
  full_name: string;

  @Column({ type: 'varchar', length: 127, nullable: true })
  avatar_bucket: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_name: string;

  @Column({ type: 'varchar', length: 1023, nullable: true })
  avatar_url: string;

  @Column({ type: 'tinyint', default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'text', nullable: true })
  bookmark_blog_posts: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
