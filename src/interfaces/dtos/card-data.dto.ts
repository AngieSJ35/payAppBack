import { IsString, Length, Matches } from 'class-validator';

export class CardDataDto {
  @IsString()
  @Length(16, 16, { message: 'El número de tarjeta debe tener 16 dígitos' })
  @Matches(/^\d+$/, {
    message: 'El número de tarjeta debe contener solo dígitos',
  })
  cardNumber: string;

  @IsString()
  @Length(3, 4)
  cvv: string;

  @IsString()
  @Length(5, 5)
  @Matches(/^\d{2}\/\d{2}$/, { message: 'Fecha debe ser en formato MM/YY' })
  expiration: string;

  @IsString()
  cardHolderName: string;
}
