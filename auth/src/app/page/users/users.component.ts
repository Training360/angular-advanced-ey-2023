import { Component, inject } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  userService = inject(UserService);

  config = inject(ConfigService);

  users$ = this.userService.getAll();

  cols = this.config.userTableColumns;

}
