import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TransactionController } from '../../interfaces/controllers/transaction.controller';
import { CreateTransactionUseCase } from '../../application/use-cases/transaction/create-transaction.use-case';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { TransactionRepositoryImpl } from '../../infrastructure/database/repositories/transaction.repository.impl';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductRepositoryImpl } from '../../infrastructure/database/repositories/product.repository.impl';
import { Adapter } from '../../infrastructure/external-apis/adapter';
import { PaymentGateway } from '../../domain/services/payment-gateway';
@Module({
  imports: [HttpModule],
  controllers: [TransactionController],
  providers: [
    PrismaService,
    CreateTransactionUseCase,
    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
    { provide: ProductRepository, useClass: ProductRepositoryImpl },
    { provide: PaymentGateway, useClass: Adapter },
  ],
})
export class TransactionModule {}
