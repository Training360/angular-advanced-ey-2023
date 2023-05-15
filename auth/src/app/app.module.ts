import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { NavComponent } from './common/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './page/register/register.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { DynamicFormComponent } from './common/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForbiddenComponent,
    LoginComponent,
    UsersComponent,
    UserEditorComponent,
    NavComponent,
    RegisterComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
