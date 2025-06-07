import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { State } from './state.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @Column({ nullable: true })
  delivery: string;

  @Column('int', { array: true })
  products: number[];

  @Column({ type: 'json' })
  location: any;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 1 }) // Estado por defecto: pending (id = 1)
  stateId: number;

  @ManyToOne(() => State, state => state.orders)
  @JoinColumn({ name: 'stateId' })
  state: State;
}
