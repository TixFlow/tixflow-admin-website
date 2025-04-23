export enum EventType {
  LIVE_MUSIC = "live_music",
  STAGE_AND_ART = "stage_and_art",
  SPORTS = "sports",
  OTHER = "other",
}

export enum EventStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  EXPIRED = "expired",
  REMOVED = "removed",
}

export interface Event {
  id: string;
  name: string;
  coverUrl: string;
  location: string;
  type: EventType;
  time: Date;
  introduction: string;
  description: string;
  condition: string;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
