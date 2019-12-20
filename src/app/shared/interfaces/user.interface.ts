import { Roles } from './roles.interface';

export interface User {
  uid: string;
  roles: Roles;
}
