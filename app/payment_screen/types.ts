export enum TicketType {
    NORMAL = "Normal",
    VIP = "VIP",
    VVIP = "VVIP",
  }
  
  export interface Ticket {
    id: number;
    type: TicketType;
    price: number;
    quantity: number;
    seat: string;
    seatCount: number;
  }
  
  export interface JwtPayload {
    sub: number;
    email: string;
    exp?: number;
  }