import { Controller, Get, Post, Param, Body, Put, Delete,Query, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { RefundDto } from './dto/refund.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}
    
    @Get()
    async findAllPayments(@Query('page') page = '1', @Query('limit') limit = '10') {
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const { data, total } = await this.paymentsService.findAllPayments(pageNumber, limitNumber);
        console.log(data[0]);

        //Aca no uso el formatResponse porque prefiero una arrowfunction dado que tengo un array
        return {
            data: data.map(payment => ({
                id: payment.id,
                orderId: payment.orderId,
                amount: payment.amount,
                transactionDetails: {transactionId: payment.transactionDetails.transactionId,
                                     paymentStatus: payment.transactionDetails.paymentState.name,
                },  
                paymentMethod: payment.paymentMethod.name,
                paymentTime: payment.paymentTime
            })),
            total, 
            page: pageNumber,
            limit: limitNumber,
        };
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const payment = await this.paymentsService.findPaymentById(id);
        return this.formatResponse(payment);
    }

    @Post()
    async createPayment(@Body() paymentData: CreatePaymentDto) {
        const payment = await this.paymentsService.createPayment(paymentData);
        return this.formatResponse(payment);
    }

    @Put(':id/status')
    async updateStatus(@Param('id') id: number, @Body() status: UpdateStatusDto) {
        const payment = await this.paymentsService.updatePaymentStatus(id, status);
        return this.formatResponse(payment);
    }

    @Post(':id/refund')
    async refundPayment(@Param('id') id: number, @Body() refund: RefundDto) {
        const payment = this.paymentsService.refundPayment(id, refund);
        return payment;
    }

    @Delete(':id')
    deletePayment(@Param('id') id: number) {
        //aca no hace falta el formatresponse porque solo devuelve un mensaje
        return this.paymentsService.deletePayment(id);
    }

    //Hicimos este método para formatear la respuesta de los pagos acorde al pdf,dejando algunos atributos de lado. 
    formatResponse(payment) {
        return {
            id: payment.id,
            orderId: payment.orderId,
            status: payment.status.value,
            amount: payment.amount,
            transactionDetails: {
                transactionId: payment.transactionDetails.transactionId,
                paymentStatus: payment.transactionDetails.paymentState.name, 
            },
            paymentMethod: payment.paymentMethod.name,
            paymentTime: payment.paymentTime,
        };
    }
}
