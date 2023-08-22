// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../../products.service';
import { CartService } from 'src/app/cart.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedProductId: string | null = null;
  selectedProduct: any = {};
  isLoading: boolean = true;
  vehiclePlaceholderImageUrl: string = 'assets/images/vehicle-placeholder.jpeg';
  starshipPlaceholderImageUrl: string = 'assets/images/starship-placeholder.jpeg';

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
    const vehicles$ = this.swapiService.getProducts('vehicles', 1);
  const starships$ = this.swapiService.getProducts('starships', 1);

  forkJoin([vehicles$, starships$]).subscribe(
    ([vehicles, starships]) => {
      const allProducts = [...vehicles.results, ...starships.results];
      const foundProduct = allProducts.find((product: any) =>
        product.url.includes(this.selectedProductId)
      );

      if (foundProduct) {
        this.selectedProduct = foundProduct;
        if (!this.selectedProduct.image) {
          this.selectedProduct.image =
            this.selectedProduct.type === 'vehicles'
              ? this.vehiclePlaceholderImageUrl
              : this.starshipPlaceholderImageUrl;
        }
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
