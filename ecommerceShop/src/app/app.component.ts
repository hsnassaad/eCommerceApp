import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from './products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService, private productService: ProductService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
    }
    const orderProducts = JSON.parse(localStorage.getItem('orderProducts'));
    if (orderProducts) {
      this.productService.updateOrderProducts(orderProducts);
    }
  }
  }
