import { IsInt, Min, ValidateNested } from 'class-validator';
import { CardDataDto } from './card-data.dto';
import { Type } from 'class-transformer';

export class CreateTransactionRequestDto {
  @IsInt({ message: 'El ID del producto debe ser un número' })
  @Min(1, { message: 'El ID del producto debe ser mayor que 0' })
  productId: number;

  @ValidateNested()
  @Type(() => CardDataDto)
  cardData: CardDataDto;
}
