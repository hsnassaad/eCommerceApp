import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  loading = true;
  productForData: Product;

  constructor(private productService: ProductService, private router: ActivatedRoute,
              public dialog: MatDialog, public authService: AuthService) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.products = data.products;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  removeProductFromList(data: Product) {
    this.productService.deleteProduct(data.productId).subscribe(() => {
      this.products.splice(this.products.indexOf(data), 1);
    }, error => {
      console.log(error);
    });
  }

  updateProduct(data: any) {
    console.log(data);
    const product = this.products.find(p => p.productId === data.productId);

    product.title = data.product.title;
    product.description = data.product.description;
    product.quantity = data.product.quantity;
    product.unitPrice = data.product.unitPrice;
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '500px',
      data: {
        product: null,
        forEdit: false
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      if (result.event === 'Add') {
      this.products.push(result.product);
      }
    }
    });
  }

}
