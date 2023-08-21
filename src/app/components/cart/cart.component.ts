// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }
}
