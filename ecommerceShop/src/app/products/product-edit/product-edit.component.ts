import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {


  productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService,
              private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.buildForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  checkValue() {
    if (this.data.quantity < 1) {
      this.data.quantity = 1;
    }
  }

  AddOrUpdate() {
    if (this.data.forEdit === false) {
    this.productService.AddProduct(this.productForm.value).subscribe(data => {
      this.data.product = data;
    }, error => {
      this.snackBar.open(error, 'cancel', {
        duration: 5000 ,
      });
    }, () => {
      this.snackBar.open('Product Added Succesfuly', 'cancel', {
        duration: 5000 ,
      });
      this.dialogRef.close({event: 'Add', product: this.data.product});
    });
  } else {
    this.productService.UpdatedProduct(this.data.product.productId, this.productForm.value).subscribe(() => {
    }, error => {
      this.snackBar.open(error, 'cancel', {
        duration: 5000 ,
      });
    }, () => {
      this.dialogRef.close({event: 'Update', productId: this.data.product.productId, updatedProduct: this.productForm.value});
      this.snackBar.open('Updated Product', 'cancel', {
        duration: 5000 ,
      });
    });
  }
  }

  buildForm() {
    if (this.data.forEdit === true) {
    this.productForm = this.fb.group({
      title: [this.data.product.title, Validators.required],
      description: [this.data.product.description],
      unitPrice: [this.data.product.unitPrice, Validators.required],
      quantity: [this.data.product.quantity, Validators.required],
    });
  } else {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }
  }

}
