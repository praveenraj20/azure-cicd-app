import { Role } from './role.model';

export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  role!: Role;
  token?: string;
}

export enum ERole {
  ADMIN = 4,
  OWNER = 3,
  PARTNER = 2,
  SEEKER = 1
}
