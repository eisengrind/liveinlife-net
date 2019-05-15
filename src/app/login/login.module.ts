import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  MatIconModule
} from '@angular/material';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ApiModule } from '../api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Ld2FqMUAAAAAF7aNetI-XagORMSp4DpHRwmP-n_' } as RecaptchaSettings
    }
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    RecaptchaModule,
    MatIconModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
