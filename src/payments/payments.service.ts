import { Injectable,NotFoundException } from '@nestjs/common';
import {transaction} from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {transactionDetail} from  './transactionDetail.entity';

@Injectable()
export class PaymentsService {
    // Crea la entidad transaction y detalle transaccion, desde la cual podemos acceder a la base de datos mediante metodos
    constructor(@InjectRepository(transaction)private  transaction: Repository<transaction>,
                @InjectRepository(transactionDetail)private  transactionDetail: Repository<transactionDetail>) {}
    

    async findAllPayments() {
        return this.transaction.find();
    }

    //Busca un pago, sino lo encuentra manda una excepción 
    async findPaymentById(TransactionId: number) {
        const payment = await this.transaction.findOne({ where: { TransactionId } });
        if (!payment) throw new NotFoundException('Payment not found');
        return payment;
    }

    //Creo un pago y el detalle del pago o transaccion,recordando patron creador,el todo crea sus partes
    async createPayment(data: CreatePaymentDto) {
        const transDetail = this.transactionDetail.create({paymentStateId:1});
        await this.transactionDetail.save(transDetail);

        
        const newPayment = this.transaction.create({
            Order: { OrderId: data.OrderId },
            paymentMethod: { paymentMethodId: data.method },
            amount: data.amount,
            transactionDetails: transDetail.transactionDetailId,
            paymentTime: new Date().toISOString(),
        });

        return this.transaction.save(newPayment);
    }

    async updatePaymentStatus(id: number, dto: UpdateStatusDto) {
        const payment = await this.findPaymentById(id);
        payment.status = dto.status;
        payment.transactionDetails.paymentStatus = dto.status;
        return this.transaction.save(payment);
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
        return this.transaction.save(payment);
    }

    async deletePayment(id: number) {
        const payment = await this.findPaymentById(id);
        await this.transaction.remove(payment);
        return { message: 'deleted' };
    }



}

