export class User {
  [k: string]: any;
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  role?: number = 0;
  token?: string = '';
}
