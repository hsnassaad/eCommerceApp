import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  loading = true;

  constructor(private productService: ProductService, private router: ActivatedRoute) { }

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


}
