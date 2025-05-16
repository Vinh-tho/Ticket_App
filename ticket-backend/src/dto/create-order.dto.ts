export class CreateOrderDetailDto {
  ticketId: number;
  quantity: number;
  seatId?: number;
}

export class CreateOrderDto {
  userId: number;
  eventDetailId: number;
  items: { ticketId: number; quantity: number; seatId?: number }[];
}
