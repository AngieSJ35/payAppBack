import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { PaymentGateway } from '../../../domain/services/payment-gateway';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { CardDataDto } from '../../../interfaces/dtos/card-data.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly productRepo: ProductRepository,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  async execute(
    productId: number,
    cardData: CardDataDto,
  ): Promise<Transaction> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Producto no encontrado');

    // 1. Crear transacción en estado PENDING
    const transaction = await this.transactionRepo.createPending(productId);

    // 2. Llamar a Wompi
    const result = await this.paymentGateway.pay(cardData, product);

    // 3. Actualizar transacción con resultado
    await this.transactionRepo.updateStatus(transaction.id, result);

    if (result === 'SUCCESS') {
      // 4. Actualizar stock
      await this.productRepo.updateStock(productId, product.stock - 1);

      // 5. (Opcional) Asignar entrega
      // await this.deliveryRepo.create({...});
    }

    return { ...transaction, status: result };
  }
}
