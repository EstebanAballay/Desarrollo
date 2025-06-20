/*
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string; // E.g.: 'pending', 'in_progress', 'delivered'

  @Column()
  description: string;

  @OneToMany(() => Order, order => order.state)
  orders: Order[];
}
*/
