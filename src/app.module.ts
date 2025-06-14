import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/order.entity';
import { State } from './orders/state.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Transaction } from './payments/transaction.entity'; 

import { PaymentsModule } from './payments/payments.module';

import { paymentmethod } from './payments/paymentmethod.entity';
import { transactionDetail } from './payments/transactionDetail.entity';
import { transactionStatus } from './payments/transactionstatus.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mipassword',
      database: 'ordenes_pagos',
      entities: [
      Order, Transaction, State, transactionDetail, transactionStatus, paymentmethod
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order, paymentmethod, transactionDetail, transactionStatus, State]),
    PaymentsModule,
  ],
  controllers: [OrdersController, AppController],
  providers: [OrdersService, AppService],
})
export class AppModule {}
