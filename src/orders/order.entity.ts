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

  @Column({ nullable: true })
  delivery: string;

  @Column('int', { array: true })
  products: number[];

  @Column({ type: 'json' })
  location: any;

  @CreateDateColumn()
  createdAt: Date;
}

// @Column('int', { array: true }) sirve para guardar products: [1, 2].

// @Column({ type: 'json' }) es ideal para guardar objetos como location.

// @CreateDateColumn() guarda la fecha de creación automáticamente.