import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { IFormControl } from 'src/app/service/config.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() set settings(group: IFormControl[]) {
    this.controlList = group;
    group.forEach( control => {
      this.controls[control.key] = new FormControl('', {
        validators: control.validators,
      });
    });
    this.group = new FormGroup(this.controls);
  };

  group: FormGroup = new FormGroup({});

  controls: {[k: string]: FormControl} = {};

  controlList: IFormControl[] = [];

  getControlSetting(key: string): IFormControl | undefined {
    return this.controlList.find( c => c.key === key );
  }

  get groupItems(): string[] {
    return Object.keys(this.group.controls).map( c => c );
  }

}
