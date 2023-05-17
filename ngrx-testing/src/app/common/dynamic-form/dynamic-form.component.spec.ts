import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { User } from 'src/app/model/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent<User>;
  let fixture: ComponentFixture<DynamicFormComponent<User>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    });
    fixture = TestBed.createComponent(DynamicFormComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
