// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  removeFromCart(item: Product) {
    this.cartService.removeFromCart(item);
  }
}
