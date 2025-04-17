export enum TicketStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  SOLD_OUT = "sold_out",
  REMOVED = "removed",
}

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  minInOrder: number;
  maxInOrder: number;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
}
