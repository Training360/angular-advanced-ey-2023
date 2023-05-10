import { Component, inject } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { ConfigService, INavItem } from 'src/app/service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  config = inject(ConfigService);

  auth = inject(AuthService);

  user$ = this.auth.currentUserSubject;

  items = this.config.navItems;

  checkLogin(item: INavItem): boolean {
    if (item.isLogin) {
      return Boolean(this.user$.value);
    }
    return true;
  }

  onLogout(): void {
    this.auth.logout();
  }

}
