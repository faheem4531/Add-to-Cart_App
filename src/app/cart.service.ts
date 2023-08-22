// cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.url === item.url);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(item: any) {
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

  isInCart(product: any): boolean {
    return this.cartItems.some((item) => item.url === product.url);
  }

  getProductQuantity(product: any): number {
    const cartItem = this.cartItems.find(item => item.url === product.url);
    return cartItem ? cartItem.quantity : 0;
  }
}
