import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { OrderProduct } from 'src/app/models/order-product';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderProduct, private productService: ProductService,
    private snackBar: MatSnackBar) {}



  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkValue() {
    if (this.data.quantity < 1) {
      this.data.quantity = 1;
    }
  }

  AddItem() {
    this.productService.AddProductToOrder(this.data, true);
    this.snackBar.open('The product **' + this.data.product.title + '** has been added to cart.', 'cancel', {
      duration: 5000 ,
    });
  }


}
