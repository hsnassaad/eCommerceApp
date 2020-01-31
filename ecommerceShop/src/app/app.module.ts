import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRouts } from './routes';


import { AuthService } from './shared/auth.service';
import { ProductService } from './products/product.service';
import { OrderService } from './orders/order.service';
import { UserService } from './users/user.service';
import { AdminService } from './dashboard/admin.service';
import { AuthGuard } from './guards/auth.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { EditProfileUnsavedChanges } from './guards/edit-profile-unsaved-changes.guard';
import { ProductListResover } from './_resolver/product-list.resolver';
import { OrderListResover } from './_resolver/order-list.resolver';
import { OrderDetailsResover } from './_resolver/order-details.resolver';
import { ErrorInterceptorProvider } from './guards/error.interceptor';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopPaidUsersChartComponent } from './dashboard/top-paid-users-chart/top-paid-users-chart.component';
import { TopRequestedProductsChartComponent } from './dashboard/top-requested-products-chart/top-requested-products-chart.component';
import { UsersListComponent } from './dashboard/users-list/users-list.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MaterialsModule } from './materials.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import {FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      MainNavComponent,
      LoginComponent,
      RegisterComponent,
      ProductsListComponent,
      ProductCardComponent,
      ProductDetailsComponent,
      OrderListComponent,
      OrderDetailsComponent,
      ProductEditComponent,
      UserEditComponent,
      DashboardComponent,
      TopPaidUsersChartComponent,
      TopRequestedProductsChartComponent,
      UsersListComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialsModule,
      FlexLayoutModule,
      RouterModule.forRoot(appRouts),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      ChartsModule,
      JwtModule.forRoot({
        config: {
          // tslint:disable-next-line: object-literal-shorthand
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost:44351'],
          blacklistedRoutes: ['localhost:44351/api/v1.0/authentication']
        }
      })
   ],
   providers: [
    AuthService,
    ProductService,
    OrderService,
    UserService,
    AdminService,
    ErrorInterceptorProvider,
    EditProfileUnsavedChanges,
    AuthGuard,
    AnonymousGuard,
    ProductListResover,
    OrderListResover,
    OrderDetailsResover
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
    ProductDetailsComponent,
    ProductEditComponent
   ]
})
export class AppModule { }
