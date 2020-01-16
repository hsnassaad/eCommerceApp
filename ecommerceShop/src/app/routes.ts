import { Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const appRouts: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
