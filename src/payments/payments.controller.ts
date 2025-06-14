import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './update-status.dto';
import { RefundDto } from './dto/refund.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    @Get()
    findAllPayments() {
        return this.paymentsService.findAllPayments();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.paymentsService.findPaymentById(id);
    }

    @Post()
    createPayment(@Body() paymentData: CreatePaymentDto) {
        return this.paymentsService.createPayment(paymentData);
    }

    @Put(':id/status')
    updateStatus(@Param('id') id: number, @Body() status: UpdateStatusDto) {
        return this.paymentsService.updatePaymentStatus(id, status);
    }

    @Post(':id/refund')
    refundPayment(@Param('id') id: number, @Body() refund: RefundDto) {
        return this.paymentsService.refundPayment(id, refund);
    }

    @Delete(':id')
    deletePayment(@Param('id') id: number) {
        return this.paymentsService.deletePayment(id);
    }
}
