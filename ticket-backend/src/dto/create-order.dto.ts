export class CreateOrderDetailDto {
  ticketId: number;
  quantity: number;
}

export class CreateOrderDto {
  userId: number;
  items: { ticketId: number; quantity: number; seat?: string }[];
}
