import { Component, inject } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent {
  config = inject(ConfigService);

  formSettings = this.config.userEditForm;
}
