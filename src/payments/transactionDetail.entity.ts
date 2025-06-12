import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { State } from '../orders/state.entity';
@Entity()
export class transactionDetail {
    @PrimaryGeneratedColumn()
    transactionDetailId: number;

    @Column({default:1})
    paymentStateId: number; 

    @ManyToOne(() => State)
    @JoinColumn({ name: 'paymentStateId' })
    paymentState: State;
};
