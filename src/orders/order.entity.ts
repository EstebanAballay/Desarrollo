import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  restaurantId: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })  // nullable si puede ser opcional
  delivery: any;

  @Column('int', { array: true })
  products: number[];

  @Column({ type: 'json' })
  location: any;

  @CreateDateColumn()
  createdAt: Date;
}

