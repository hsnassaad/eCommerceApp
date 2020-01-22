import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductListResover } from './_resolver/product-list.resolver';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderListResover } from './_resolver/order-list.resolver';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderDetailsResover } from './_resolver/order-details.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';


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
      {path: 'profile/edit', component: UserEditComponent},
      { path: 'main/orders',
      children: [
        {path: '', component: OrderListComponent, resolve: {orders: OrderListResover}},
        {path: ':id', component: OrderDetailsComponent, resolve: {order: OrderDetailsResover}}
      ] },
      {path: 'main/products', component: ProductsListComponent, resolve: {products: ProductListResover}},
      { path: '**', redirectTo: 'main/products', pathMatch: 'full' },
    ]
  },

];
