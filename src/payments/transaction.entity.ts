import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    amount: number;

    @Column()
    paymentMethod: string;

    @Column('json')
    transactionDetails: {
      transactionId: string;
      paymentStatus: string;
    };

    @Column()
    paymentTime: string;

    @Column({ default: 'paid' })
    status: string;

    @Column('json', { nullable: true })
    refundDetails?: {
      refundTransactionId: string;
      refundStatus: string;
      reason?: string;
    };

    @Column({ nullable: true })
    refundTime?: string;
}
