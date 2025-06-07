import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/order.entity';
import { State } from './orders/state.entity';
import {AppService} from './app.service';

import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';

import { paymentmethod } from './payments/paymentmethod.entity';
import { transactionDetail } from './payments/transactionDetail.entiy';
import { transactionStatus } from './payments/transactionstatus.entity';
import {AppController} from './app.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mipassword',
      database: 'ordenes_pagos',
      entities: [Order, paymentmethod,transactionDetail, transactionStatus, State], // Se importan las entidades
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order,paymentmethod,transactionDetail,transactionStatus,State]), // Se importan entidades para usar en los services
  ],
  controllers: [OrdersController, PaymentsController,AppController], // Se importan los controladores
  providers: [OrdersService, PaymentsService,AppService], // Se importan los servicios
})
export class AppModule {}