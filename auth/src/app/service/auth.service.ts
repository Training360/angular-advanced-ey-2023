import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface ILoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);

  router: Router = inject(Router);

  apiUrl: string = environment.apiUrl;

  loginUrl = `${this.apiUrl}login`;

  storageName = 'currentUser';

  readonly currentUserSubject: BehaviorSubject<User | null>
    = new BehaviorSubject<User | null>(null);

  lastToken: string = '';

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  constructor() { }

  login(loginData: ILoginData): void {
    this.http.post( this.loginUrl, loginData ).pipe(
      switchMap( (response: {accessToken?: string, user?: User}) => {
        if (response.accessToken && response.user) {
          this.lastToken = response.accessToken;
          this.currentUserSubject.next(response.user);
        }
        return of(response);
      })
    ).subscribe(
      response => console.log('AuthService:login', response)
    );
  }

}

/*
fetch('http://localhost:3000/login', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email: 'cf@gmail.com', password: 'test'})
}).then( resp => resp.json() ).then( data => console.log(data) );
*/
