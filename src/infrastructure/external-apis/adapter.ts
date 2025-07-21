import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  PaymentGateway,
  PaymentResult,
} from '../../domain/services/payment-gateway';
import { CardDataDto } from '../../interfaces/dtos/card-data.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Product } from '@prisma/client';

@Injectable()
export class Adapter implements PaymentGateway {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) { }

  async pay(
    cardData: CardDataDto,
    productData: Product,
  ): Promise<PaymentResult> {
    const apiUrl = this.config.get<string>('PAYURL');
    const pubKey = this.config.get<string>('PUB_KEY');
    const integSec = this.config.get<string>('INTEG_SEC');
    const [mes, año] = cardData.expiration.split('/');

    try {
      const response$ = this.http.get(`${apiUrl}/merchants/${pubKey}`);
      const { data } = await firstValueFrom(response$);
      const acceptandeceToken = data.data.presigned_acceptance.acceptance_token;
      const acceptandecePersonalToken =
        data.data.presigned_personal_data_auth.acceptance_token;
      const payload = {
        number: cardData.cardNumber,
        cvc: cardData.cvv,
        exp_month: mes,
        exp_year: año,
        card_holder: cardData.cardHolderName,
      };
      const responseTokenization$ = this.http.post(
        `${apiUrl}/tokens/cards`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${pubKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const dataToken = await firstValueFrom(responseTokenization$);
      const tokenization = dataToken.data.data.id;
      const cadenaConcatenada =
        'productos' + productData.price + '00COP' + integSec;
      const encondedText = new TextEncoder().encode(cadenaConcatenada);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const payloadTran = {
        acceptance_token: acceptandeceToken,
        accept_personal_auth: acceptandecePersonalToken,
        amount_in_cents: productData.price * 100,
        currency: 'COP',
        reference: 'productos',
        customer_email: 'angie.sibaja35@gmail.com',
        signature: hashHex,
        payment_method: {
          type: 'CARD',
          installments: 1,
          token: tokenization,
        },
      };
      const responsePayment$ = this.http.post(
        `${apiUrl}/transactions`,
        payloadTran,
        {
          headers: {
            Authorization: `Bearer ${pubKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const dataTran = await firstValueFrom(responsePayment$);
      if (dataTran.data.data.status === 'PENDING') return 'SUCCESS';
      return 'FAILED';
    } catch (error) {
      console.error('Error en el pago:', error.message);
      return 'FAILED';
    }
  }
}
