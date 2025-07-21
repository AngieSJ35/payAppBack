import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionRequestDto } from '../dtos/create-transaction.request.dto';
import { CreateTransactionUseCase } from '../../application/use-cases/transaction/create-transaction.use-case';
import { Transaction } from '../../domain/entities/transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly createTransaction: CreateTransactionUseCase) {}

  @Post()
  async create(@Body() dto: CreateTransactionRequestDto): Promise<Transaction> {
    return await this.createTransaction.execute(dto.productId, dto.cardData);
  }
}
