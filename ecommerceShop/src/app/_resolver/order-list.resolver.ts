import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../models/order';
import { OrderService } from '../orders/order.service';

@Injectable()

export class OrderListResover implements Resolve<Order[]> {

  constructor(private orderService: OrderService,
              private router: Router, private snackBar: MatSnackBar) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {

    return this.orderService.getOrders().pipe(
      catchError(error => {
        this.snackBar.open('Problem retriving your data', 'cancel', {
          duration: 5000 ,
        });

        this.router.navigate(['main/orders']);
        return of(null);
      })
    );

  }

}
