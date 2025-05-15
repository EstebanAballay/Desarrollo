import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Order } from './orders/order.entity';

import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mipassword',
      database: 'ordenes_pagos',
      entities: [Order], // Se importan las entidades
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]), // Se importan entidades para usar en los services
  ],
  controllers: [OrdersController, PaymentsController], // Se importan los controladores
  providers: [OrdersService, PaymentsService], // Se importan los servicios
})
export class AppModule {}
