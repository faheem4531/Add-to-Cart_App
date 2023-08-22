// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { forkJoin } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedProductId: string | null = null;
  selectedProduct: Product;
  isLoading: boolean = true;
  vehiclePlaceholderImageUrl: string = 'assets/images/vehicle-placeholder.jpeg';
  starshipPlaceholderImageUrl: string = 'assets/images/starship-placeholder.jpeg';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
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
    const vehicles$ = this.productsService.getProducts('vehicles', 1);
  const starships$ = this.productsService.getProducts('starships', 1);

  forkJoin([vehicles$, starships$]).subscribe(
    ([vehicles, starships]) => {
      const allProducts = [...vehicles.results, ...starships.results];
      const foundProduct = allProducts.find((product: Product) =>
        product.url.includes(this.selectedProductId || '')
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }

  getProductQuantity(product: Product) {
    return this.cartService.getProductQuantity(product);
  }
}
