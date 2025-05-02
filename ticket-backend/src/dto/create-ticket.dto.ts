import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  eventId: number; // ID sự kiện
}
