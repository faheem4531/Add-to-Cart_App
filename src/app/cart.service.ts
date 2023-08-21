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
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  isInCart(product: any): boolean {
    return this.cartItems.some((item) => item.id === product.id);
  }
}
