import { OrderProduct } from './order-product';

export interface Order {
  orderId: number;
  numberOfItems: number;
  totalPrice: number;
  createdDate: string | Date;
  orderProducts?: OrderProduct[];
}
