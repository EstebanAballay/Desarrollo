import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RefundDto } from './dto/refund.dto';

import { Transaction } from './transaction.entity';
import { PaymentMethod } from './paymentmethod.entity';
//import { transactionDetail } from './transactionDetail.entity';
import {transactionStatus} from './transactionstatus.entity';
import { transactionDetail } from './transactionDetail.entity';

@Injectable()
export class PaymentsService {
    constructor(@InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
                @InjectRepository(PaymentMethod) private paymentMethodRepo: Repository<PaymentMethod>,
                @InjectRepository(transactionStatus) private transactionStatusRepo: Repository<transactionStatus>,
                @InjectRepository(transactionDetail) private transactionDetailRepo: Repository<transactionDetail>) {}


    async findAllPayments(page = 1, limit = 10): Promise<{ data: Transaction[]; total: number }> {
        const [data, total] = await this.transactionRepo.findAndCount({
            relations:['transactionDetails'],
        skip: (page - 1) * limit,
        take: limit,
    });

    return { data, total };
    }   


    async findPaymentById(id: number) {
        const payment = await this.transactionRepo.findOne({ 
            where: { id },
            relations: ['paymentMethod']
        });
        if (!payment) throw new NotFoundException('Payment not found');
        return payment;
    }

    async createPayment(data: CreatePaymentDto) {
        // Buscar el método de pago por nombre para almacenar su puntero y tiro una excepcion si no existe
        const paymentMethod = await this.paymentMethodRepo.findOne({
            where: { name: data.method}
        });
        if (!paymentMethod) {
            throw new BadRequestException(`Payment method '${data.method}' not found or inactive`)}

        //Busca si el nombre del estado de pago si existe en la base de datos y sino, tiro una excepcion
        const paymentState = await this.transactionStatusRepo.findOne({
            where: { name: data.transactionDetails.paymentStatus}
        });
        if (!paymentState) {
            throw new BadRequestException(`Payment state '${data.transactionDetails.paymentStatus}' not found`);
        }
        const transactionDetail = this.transactionDetailRepo.create({
        paymentState: paymentState, 
        });

        //crea finalmente el pago
        const newPayment = this.transactionRepo.create({
            orderId: data.orderId,
            amount: data.amount,
            paymentMethod: paymentMethod, // Asignar la entidad completa(puntero)
            transactionDetails:transactionDetail , // Asignar el estado de pago
            status: paymentState.name, 
            paymentTime: new Date().toISOString(),
        });
        
        //le pasamso esto al controller y despues el lo formatea
        return this.transactionRepo.save(newPayment);
    }

    async updatePaymentStatus(id: number, dto: UpdateStatusDto) {
        //Primero busco el pago por id
        const payment = await this.findPaymentById(id);
        //luego compruebo que ese estado exista
        const paymentState = await this.transactionStatusRepo.findOne({
            where: { name: dto.status}
        });
        if (!paymentState) {
            throw new BadRequestException(`Payment state '${dto.status}' not found`);
        }
        //finalmente actualizo ambos estados
        payment.status = dto.status;
        payment.transactionDetails.paymentStateId = paymentState.id;

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
