import { Component, inject } from '@angular/core';
import { AuthService, ILoginData } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  auth: AuthService = inject(AuthService);

  loginError$ = this.auth.loginErrorSubject;

  loginData: ILoginData = {
    email: '',
    password: '',
  };

  onLogin(): void {
    this.auth.login(this.loginData);
  }

}
