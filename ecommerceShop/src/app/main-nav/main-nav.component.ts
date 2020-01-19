import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { error } from 'protractor';
import { OrderProduct } from '../models/order-product';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit  {


  logInUser: User;
  orderProducts: OrderProduct[];
  total = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService, private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.logInUser = this.authService.currentUser;
    this.productService.orderProducts.subscribe(data => {
      this.orderProducts = data;
      this.total = this.orderProducts.reduce(
        (acc, currentOrderProduct) => {
          return acc + (currentOrderProduct.quantity * currentOrderProduct.product.unitPrice);
        }, 0
      );
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('orderProducts');
    this.productService.updateOrderProducts([]);
    this.authService.currentUser = null;
    this.authService.decodedToken = null;
    this.router.navigate(['auth/login']);
  }

  removeAllOrders() {
    localStorage.removeItem('orderProducts');
    this.productService.updateOrderProducts([]);
  }

}
