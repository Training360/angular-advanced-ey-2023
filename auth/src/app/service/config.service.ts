import { Injectable } from '@angular/core';

export interface INavItem {
  text: string;
  href: string;
  isLogin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  navItems: INavItem[] = [
    {text: 'Home', href: '/', isLogin: true},
    {text: 'Users', href: '/users', isLogin: true},
    // {text: 'Login', href: '/login'},
    {text: 'Registration', href: '/register'},
  ];

  constructor() { }
}
