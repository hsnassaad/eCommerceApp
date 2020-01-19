import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { OrderProduct } from '../models/order-product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl + 'products';
  private  orderProductsSource = new BehaviorSubject<OrderProduct[]>([]);
  private orderProductsForSave: OrderProduct[] = [];
  orderProducts = this.orderProductsSource.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>  {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  AddProductToOrder(orderProduct: OrderProduct, fromDetailsPage: boolean) {

    if (fromDetailsPage) {
    const products = JSON.parse(localStorage.getItem('orderProducts'));
    if (products) {
      this.orderProductsForSave = products;
    }
    const product = this.orderProductsForSave.find(data => {
    return data.product.productId === orderProduct.product.productId;
    });
    if (product) {
    product.quantity = orderProduct.quantity;
  } else {
  this.orderProductsForSave.push(orderProduct);
  }
    const productsToSave = JSON.stringify(this.orderProductsForSave);
    this.orderProductsSource.next(this.orderProductsForSave);
    localStorage.setItem('orderProducts', productsToSave);
}
  }

  updateOrderProducts(orderProduct: OrderProduct[]) {
    this.orderProductsSource.next(orderProduct);
    this.orderProductsForSave = [];
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.baseUrl + '/' + productId);
  }
}
