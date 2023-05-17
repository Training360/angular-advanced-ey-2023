import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  type?: string;
  options?: { text: string; value: any }[];
  validators?: ValidatorFn[] | ValidatorFn;
  errorMessages?: {[k: string]: string};
}

export class ValidatorIndex extends Validators {
  [k: string]: any;
  required = Validators.required;
  pattern = Validators.pattern;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  static settings: {[k: string]: any} = {};

  static apiUrl: string = environment.apiUrl;

  http: HttpClient = inject(HttpClient);

  navItems: INavItem[] = [
    { text: 'Home', href: '/', isLogin: true },
    { text: 'Users', href: '/users', isLogin: true },
    { text: 'Products', href: '/products' },
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
        Validators.pattern(/^[A-Z][A-Za-z .]{4,19}$/),
      ],
    },
    {
      key: 'lastName',
      label: 'Last Name',
      baseType: 'input',
      type: 'text',
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Z][A-Za-z .]{4,19}$/),
      ],
      errorMessages: {
        'required': 'Lastname is required!',
        'pattern': 'Lastname must be minimum 5 chars length!',
      },
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
      baseType: 'select',
      options: [
        { text: 'Admin', value: 1 },
        { text: 'Editor', value: 2 },
        { text: 'Subscriber', value: 3 },
      ],
    },
    { key: 'id', label: '', baseType: 'input', type: 'hidden' },
  ];

  get userForm(): IFormControl[] {
    return (ConfigService.settings['userForm'] as IFormControl[]).map(
      setting => {
        if (setting.validators) {
          if (!Array.isArray(setting.validators)) {
            setting.validators = [setting.validators];
          }

          setting.validators.forEach( (validator: ValidatorFn, index: number) => {
            if (setting.validators && Array.isArray(setting.validators)) {
              const params = String(validator).split(':');
              setting.validators[index] = this.getValidator(params[0], params[1]);
            }
          });

        }
        return setting;
      }
    )
  }

  constructor() {}

  getValidator(name: string, param: string): ValidatorFn {
    switch(name) {
      case 'pattern':
        return Validators.pattern( new RegExp(param) );
        break;
      case 'min':
        return Validators.min(Number(param));
        break;
      case 'max':
        return Validators.max(Number(param));
        break;
      case 'minLength':
        return Validators.minLength(Number(param));
        break;
      case 'maxLength':
        return Validators.maxLength(Number(param));
        break;
      default:
        return Validators.required;
    }
  }

  static init(http: HttpClient): () => Observable<any> {
    return () => http.get(`${ConfigService.apiUrl}settings`)
      .pipe(
         tap( settings => ConfigService.settings = settings )
      );
   }
}
