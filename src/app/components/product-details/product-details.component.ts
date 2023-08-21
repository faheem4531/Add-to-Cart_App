// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../products.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedProductId: string | null = null;
  selectedProduct: any = {};
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private swapiService: SwapiService,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedProductId = params.get('id');
      if (this.selectedProductId) {
        this.fetchProductDetails();
      }
    });
  }

  fetchProductDetails() {
    this.swapiService.getProducts('vehicles', 1).subscribe(
      (vehicles) => {
        const foundProduct = vehicles.results.find((vehicle: any) =>
          vehicle.url.includes(this.selectedProductId)
        );
        if (foundProduct) {
          this.selectedProduct = foundProduct;
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );

    this.swapiService.getProducts('starships', 1).subscribe(
      (vehicles) => {
        const foundProduct = vehicles.results.find((vehicle: any) =>
          vehicle.url.includes(this.selectedProductId)
        );
        if (foundProduct) {
          this.selectedProduct = foundProduct;
        }
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }

  isInCart(product: any): boolean {
    return this.cartService.isInCart(product);
  }
}
