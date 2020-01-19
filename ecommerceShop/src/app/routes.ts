import { Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductListResover } from './_resolver/product-list.resolver';
import { ProductDetailsComponent } from './products/product-details/product-details.component';


export const appRouts: Routes = [

  {path: '', canActivate: [AnonymousGuard],  redirectTo: 'auth/login', pathMatch: 'full'},
  {path: '', canActivate: [AuthGuard], redirectTo: 'main/products', pathMatch: 'full'},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AnonymousGuard],
    children: [
      { path: 'auth/login', component: LoginComponent },
      { path: 'auth/register', component: RegisterComponent },
    ]
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'main/orders', component: MainNavComponent },
      {path: 'main/products', component: ProductsListComponent, resolve: {products: ProductListResover}},
      { path: '**', redirectTo: 'main/products', pathMatch: 'full' },
    ]
  },

];
