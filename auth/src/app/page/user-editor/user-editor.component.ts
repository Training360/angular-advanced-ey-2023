import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent {
  config = inject(ConfigService);

  activatedRoute = inject(ActivatedRoute);

  userService = inject(UserService);

  router = inject(Router);

  formSettings = this.config.userForm;

  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap( params => this.userService.get(params['id']) ),
  );

  onChanged(user: User): void {
    this.userService.update(user).subscribe(
      () => this.router.navigate(['/users'])
    );
  }

}
