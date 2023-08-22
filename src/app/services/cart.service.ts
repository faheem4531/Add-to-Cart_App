// cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: Product) {
    const existingItem = this.cartItems.find((cartItem: Product) => cartItem.url === item.url);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(item: Product) {
    const existingItem = this.cartItems.find(cartItem => cartItem.url === item.url);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const index = this.cartItems.indexOf(existingItem);
        if (index !== -1) {
          this.cartItems.splice(index, 1);
        }
      }
      this.cartSubject.next(this.cartItems);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  isInCart(product: Product): boolean {
    return this.cartItems.some((item) => item.url === product.url);
  }

  getProductQuantity(product: Product): number {
    const cartItem = this.cartItems.find(item => item.url === product.url);
    return cartItem ? cartItem.quantity : 0;
  }
}
