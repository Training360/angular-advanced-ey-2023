import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { RegisterComponent } from './page/register/register.component';
import { authGuard } from './guard/auth.guard';
import { roleGuard } from './guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      authGuard,
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [
      authGuard,
      roleGuard,
    ],
    data: {
      role: 2,
    },
  },
  {
    path: 'users/edit/:id',
    component: UserEditorComponent,
    canActivate: [
      authGuard,
      roleGuard,
    ],
    data: {
      role: 1,
    },
  },
  {
    path: 'users/create',
    component: UserEditorComponent,
    canActivate: [
      authGuard,
    ],
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
