export enum OrderType {
  BUY_TICKET = "buy_ticket",
  SELL_TICKET = "sell_ticket",
}

export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface Order {
  id: string;
  userId: string;
  ticketId: string;
  quantity: number;
  price: number;
  type: OrderType;
  paymentLink?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
