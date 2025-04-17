export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  STAFF = 'staff',
  EVENT_HOLDER = 'event_holder',
  CUSTOMER = 'customer',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SPECIFIED = 'not_specified',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  REMOVED = 'removed',
  BANNED = 'banned',
  SUSPENDED = 'suspended',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  reputation: number;
  role: UserRole;
  gender: UserGender;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}