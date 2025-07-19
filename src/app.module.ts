// src/app.module.ts

import { Module } from '@nestjs/common';
//import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
/* 
// Módulos de dominio
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DeliveryModule } from './modules/delivery/delivery.module';

// Entidades ORM (infraestructura)
import { ProductOrmEntity } from './infrastructure/database/entities/product.orm-entity';
import { TransactionOrmEntity } from './infrastructure/database/entities/transaction.orm-entity';
import { CustomerOrmEntity } from './infrastructure/database/entities/customer.orm-entity';
import { DeliveryOrmEntity } from './infrastructure/database/entities/delivery.orm-entity';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión a PostgreSQL (o DynamoDB si decides cambiar)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [ProductOrmEntity, TransactionOrmEntity, CustomerOrmEntity, DeliveryOrmEntity],
      synchronize: true, // solo en desarrollo
    }),

    // Módulos de dominio (hexagonales)
    ProductModule,
    TransactionModule,
    CustomerModule,
    DeliveryModule,
  ],
}) */
export class AppModule {}
