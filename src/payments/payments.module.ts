import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Transaction } from './transaction.entity';
import { PaymentMethod } from './paymentmethod.entity';
import { transactionStatus } from './transactionstatus.entity';
import { transactionDetail } from './transactionDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction,PaymentMethod,transactionStatus,transactionDetail])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
