import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { QuestionType } from '../enums/question';

@Entity('questions')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', default: QuestionType.CHOOSE_PRODUCT })
  type: QuestionType;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
}
