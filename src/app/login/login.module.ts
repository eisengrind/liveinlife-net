import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatCardModule
} from '@angular/material';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule
  ]
})
export class LoginModule { }
