import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../products/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class ProductListResover implements Resolve<Product[]> {

  pageNumber = 1;
  pageSize = 5;



  constructor(private productService: ProductService, private router: Router, private snackBar: MatSnackBar) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {

    return this.productService.getProducts().pipe(
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
