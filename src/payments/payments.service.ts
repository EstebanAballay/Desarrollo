import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './transaction.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './update-status.dto';
import { RefundDto } from './dto/refund.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepo: Repository<Transaction>,
    ) {}

    async findAllPayments() {
        return this.transactionRepo.find();
    }

    async findPaymentById(id: number) {
        const payment = await this.transactionRepo.findOne({ where: { id } });
        if (!payment) throw new NotFoundException('Payment not found');
        return payment;
    }

    async createPayment(data: CreatePaymentDto) {
        const newPayment = this.transactionRepo.create({
        orderId: data.orderId,
        amount: data.amount,
        paymentMethod: data.method,
        transactionDetails: data.transactionDetails,
        status: 'paid',
        paymentTime: new Date().toISOString(),
        });

        return this.transactionRepo.save(newPayment);
    }

    async updatePaymentStatus(id: number, dto: UpdateStatusDto) {
        const payment = await this.findPaymentById(id);
        payment.status = dto.status;
        payment.transactionDetails.paymentStatus = dto.status;
        return this.transactionRepo.save(payment);
    }

    async refundPayment(id: number, dto: RefundDto) {
        const payment = await this.findPaymentById(id);
        payment.status = 'refunded';
        payment.refundDetails = {
        refundTransactionId: `refund_${Date.now()}`,
        refundStatus: 'completed',
        reason: dto.reason,
        };
        payment.refundTime = new Date().toISOString();
        return this.transactionRepo.save(payment);
    }

    async deletePayment(id: number) {
        const payment = await this.findPaymentById(id);
        await this.transactionRepo.remove(payment);
        return { message: 'deleted' };
    }
}
