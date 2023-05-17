import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const errorSubject$ = new Subject<string>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginErrorSubject: errorSubject$,
            login: () => {},
          },
        }
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('error-message should show', async () => {
    errorSubject$.next('test error');

    fixture.detectChanges();

    await fixture.whenStable();

    const alertElement = fixture.nativeElement.querySelector('.alert');

    expect(alertElement).toBeTruthy();
    expect(alertElement.textContent).toMatch(/test error/i);
  });

  it('onLogin should be called', async () => {
    const inputEmail: HTMLInputElement = fixture.nativeElement.querySelector('input[name=email]');
    const inputPassword = fixture.nativeElement.querySelector('input[name=password]');
    const buttonSubmit = fixture.nativeElement.querySelector('button[type=submit]');

    spyOn(component, 'onLogin');

    inputEmail.value = 'cf@gmail.com'
    inputEmail.dispatchEvent( new Event('input') );

    inputPassword.value = 'test'
    inputPassword.dispatchEvent( new Event('input') );

    fixture.detectChanges();
    await fixture.whenStable();

    buttonSubmit.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.onLogin).toHaveBeenCalled();
    // expect(component.onLogin).toHaveBeenCalledWith();
  });
});
