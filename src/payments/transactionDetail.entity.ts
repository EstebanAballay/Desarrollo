import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { transactionStatus } from './transactionstatus.entity';
import { Transaction } from './transaction.entity';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class transactionDetail {
    @PrimaryGeneratedColumn('uuid')
    transactionId:string;

    @Column({default:1})
    paymentStateId: number; 

    @ManyToOne(() => transactionStatus)
    @JoinColumn({ name: 'paymentStateId' })
    paymentState: transactionStatus;

    /*
    @OneToOne(() => Transaction, transaction => transaction.transactionDetails)
    transaction: Transaction;*/
};
