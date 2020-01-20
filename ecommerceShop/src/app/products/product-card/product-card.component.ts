import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(public dialog: MatDialog, private productService: ProductService,
              private snackBar: MatSnackBar, public authService: AuthService) { }

  @Input() product: Product;
  @Output() removeProductFromList = new EventEmitter();
  productDetailsForDialog: Product;
  qtyForDialog = 1;

  ngOnInit() {
    this.getProductDetails();
  }

  productDetails() {

    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '500px',
      data: {
        product: this.productDetailsForDialog,
        quantity: this.qtyForDialog
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  getProductDetails() {
    this.productService.getProduct(this.product.productId).subscribe(data => {
      this.productDetailsForDialog = data;
    }, error => {
      this.snackBar.open(error, 'cancel', {
        duration: 5000 ,
      });
    });
  }

  deleteProduct() {
    if (window.confirm('Are sure you want to delete this item ?')) {
        this.removeProductFromList.emit(this.product);
     }
  }


}
