import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { State } from '../orders/state.entity';
@Entity()
export class transactionDetail {
    @PrimaryGeneratedColumn()
    transactionId: number;

    @Column({default:1})
    paymentStateId: number; 

    @Column()
    transaction:number;

    @Column()
    productId:number;

    @ManyToOne(() => State)
    @JoinColumn({ name: 'paymentStateId' })
    paymentState: State;
};
