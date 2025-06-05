import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/order.entity';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',              // nombre del servicio PostgreSQL en docker-compose
      port: 5432,              // puerto que expone el contenedor de PostgreSQL
      username: 'postgres',    // usuario definido en docker-compose
      password: 'postgres',    // contraseña definida en docker-compose
      database: 'orders',      // base de datos creada por PostgreSQL en docker-compose
      entities: [Order],       // entidades para sincronizar
      synchronize: true,       // sincroniza las tablas automáticamente
    }),
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}

