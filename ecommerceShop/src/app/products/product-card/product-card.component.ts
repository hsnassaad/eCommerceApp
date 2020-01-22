import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

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
  @Output() updateProductFromList = new EventEmitter();
  productDetailsForDialog: Product;
  qtyForDialog = 1;

  ngOnInit() {
    this.getProductDetails();
  }


AddProductToOrder() {
  this.productService.AddProductToOrder({product: this.product, quantity: 1} , false);
  this.snackBar.open('The product **' + this.product.title + '** has been added to cart.', 'cancel', {
    duration: 5000 ,
  });
}

  productDetails() {

    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '500px',
      data: {
        product: this.productDetailsForDialog,
        quantity: this.qtyForDialog
        }
    });
  }

  editProduct() {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '500px',
      data: {
          product: this.product,
          forEdit: true
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      if (result.event === 'Update') {
        this.updateProductFromList.emit({product: result.updatedProduct, productId: result.productId });
      }
    }
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
