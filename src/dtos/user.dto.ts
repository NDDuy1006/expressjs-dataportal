import * as bcrypt from 'bcrypt';

export interface UserAuthPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}