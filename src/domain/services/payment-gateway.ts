import { Product } from '@prisma/client';
import { CardDataDto } from '../../interfaces/dtos/card-data.dto';

export type PaymentResult = 'SUCCESS' | 'FAILED';

export abstract class PaymentGateway {
  abstract pay(cardData: CardDataDto, product: Product): Promise<PaymentResult>;
}
