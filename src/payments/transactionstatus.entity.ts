import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class transactionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string; 
}
