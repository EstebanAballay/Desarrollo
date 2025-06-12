import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import{ Order } from '../orders/order.entity';
import {paymentmethod} from './paymentmethod.entity';

@Entity()
export class transaction {
    @PrimaryGeneratedColumn()
    TransactionId: number;

    @Column()
    OrderId: number;

    @Column()
    paymentMethod: number;

    @Column()
    amount: number;
    
    @Column({ nullable: true })
    paymentDateTime: string;

    @Column('int', { array: true })
    refundId: number[];

    //Defino las relaciones en la bd de typorm
    @OneToOne(() => Order, order => order, { nullable: true })
    @JoinColumn({ name: 'OrderId' })
    order: Order;

    @OneToOne(() => paymentmethod)
    @JoinColumn({ name: 'paymentMethod' })
    paymentMethodEntity: paymentmethod;
}
