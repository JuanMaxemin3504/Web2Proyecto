import { Injectable } from '@angular/core';
import { Product } from '../../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }

  getTotal() {
    return this.items.reduce((total, product) => total + product.precio, 0);
  }
}
