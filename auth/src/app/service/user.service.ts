import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService<User> {

  constructor() {
    super('users');
  }
}
