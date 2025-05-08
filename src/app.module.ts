import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/order.entity';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mipassword',
      database: 'ordenes_pagos',
      entities: [Order], // Carga las entidades automaticamente
      synchronize: true, //“sincroniza las entidades con la base de datos”, es decir: crea (o actualiza) automáticamente las tablas.
    }),
    OrdersModule,
    PaymentsModule,
  ],
})


export class AppModule {}
