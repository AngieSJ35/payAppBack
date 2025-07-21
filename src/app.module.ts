// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    TransactionModule, // ✅ lo agregas aquí
  ],
})
export class AppModule {}
