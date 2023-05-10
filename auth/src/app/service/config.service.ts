import { Injectable } from '@angular/core';

export interface INavItem {
  text: string;
  href: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  navItems: INavItem[] = [
    {text: 'Home', href: '/'},
    {text: 'Users', href: '/users'},
    {text: 'Login', href: '/login'},
  ];

  constructor() { }
}
