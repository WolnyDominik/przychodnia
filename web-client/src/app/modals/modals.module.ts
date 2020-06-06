import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordInputComponent } from './password-input/password-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TextInputComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent,
    PasswordInputComponent
  ]
})
export class ModalsModule { }
