import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { IFormControl } from 'src/app/service/config.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent<T extends {[k: string]: any}> {
  @Input() set settings(group: IFormControl[]) {
    this.controlList = group;
    group.forEach( control => {
      this.controls[control.key] = new FormControl('', {
        validators: control.validators,
      });
    });
    this.group = new FormGroup(this.controls);

    this.groupSet$.next(true);
  };

  @Input() set formData(data: T) {
    this.data = data;

    this.dataSet$.next(true);
  }

  @Output() formChanged: EventEmitter<T> = new EventEmitter<T>();

  data: T | null = null;

  groupSet$: Subject<boolean> = new Subject<boolean>();

  dataSet$: Subject<boolean> = new Subject<boolean>();

  group: FormGroup = new FormGroup({});

  controls: {[k: string]: FormControl} = {};

  controlList: IFormControl[] = [];

  constructor() {
      combineLatest([this.dataSet$, this.groupSet$]).subscribe(
        () => this.fillForm()
      );
  }

  getControlSetting(key: string): IFormControl | undefined {
    return this.controlList.find( c => c.key === key );
  }

  get groupItems(): string[] {
    return Object.keys(this.group.controls).map( c => c );
  }

  fillForm(): void {
    Object.keys(this.data!).forEach( k => {
      this.group.controls[k]?.setValue(this.data![k]);
    });
  }

  getActualError(control: IFormControl, error: ValidationErrors | null): string {
    if (!control.errorMessages || !error) {
      return 'Correct the value of the settings!';
    }

    let output: string[] = [];

    Object.keys(error).forEach( k => {
      output.push(control.errorMessages?.[k] || '');
    });

    return output.join('\n');
  }

  onSave(): void {
    this.formChanged.emit( this.group.value );
  }

}
