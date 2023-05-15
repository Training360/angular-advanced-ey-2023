import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

export interface INavItem {
  text: string;
  href: string;
  isLogin?: boolean;
}

export interface ITableColumn {
  name: string;
  key: string;
}

export interface IFormControl {
  key: string;
  label: string;
  baseType: 'input' | 'textarea' | 'select';
  type: string;
  validators?: ValidatorFn[] | ValidatorFn;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  navItems: INavItem[] = [
    { text: 'Home', href: '/', isLogin: true },
    { text: 'Users', href: '/users', isLogin: true },
    // {text: 'Login', href: '/login'},
    { text: 'Registration', href: '/register' },
  ];

  userTableColumns: ITableColumn[] = [
    { key: 'firstName', name: 'First name' },
    { key: 'lastName', name: 'Last name' },
    { key: 'email', name: 'Email' },
    { key: 'role', name: 'Role' },
  ];

  userEditForm: IFormControl[] = [
    {
      key: 'firstName',
      label: 'First Name',
      baseType: 'input',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[A-Z][A-Za-z .]{4,19}/),
      ],
    },
    {
      key: 'lastName',
      label: 'Last Name',
      baseType: 'input',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/[A-Z][A-Za-z .]{4,19}/),
      ],
    },
    {
      key: 'email',
      label: 'Email',
      baseType: 'input',
      type: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      key: 'role',
      label: 'Role',
      baseType: 'input',
      type: 'number',
      validators: [Validators.required, Validators.min(1), Validators.max(5)],
    },
    { key: 'id', label: '', baseType: 'input', type: 'hidden' },
  ];

  constructor() {}
}
