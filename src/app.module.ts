import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// aca se importan las entidades

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'mipassword',
      database: 'ordenes_pagos',
      autoLoadEntities: true, // Carga las entidades automaticamente
      synchronize: true, //“sincroniza las entidades con la base de datos”, es decir: crea (o actualiza) automáticamente las tablas.
    }),
  ],
})
export class AppModule {}
