import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userService = inject(UserService);

  router = inject(Router);

  regUser: User = new User();

  onSave(user: User): void {
    this.userService.create(user).subscribe(
      user => this.router.navigate(['/users'])
    );
  }

}
