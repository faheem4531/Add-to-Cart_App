import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SwapiService } from './products.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any = [];
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private swapiService: SwapiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const vehicles$ = this.swapiService.getProducts(
      'vehicles',
      this.currentPage
    );
    const starships$ = this.swapiService.getProducts(
      'starships',
      this.currentPage
    );

    forkJoin([vehicles$, starships$]).subscribe(
      ([vehicles, starships]) => {
        this.isLoading = false;
        this.products = [...vehicles.results, ...starships.results];
        this.totalPages = Math.ceil(vehicles.count / 10);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  isInCart(item: any): boolean {
    const cartItems = this.cartService.getCartItems();
    return cartItems.includes(item);
  }

  extractIdFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  }

  nextPage() {
    if (
      this.currentPage < this.totalPages &&
      this.currentPage < this.totalPages &&
      this.currentPage < Math.min(this.totalPages, this.totalPages)
    ) {
      this.currentPage++;
      this.fetchAllData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAllData();
    }
  }

  fetchAllData() {
    this.isLoading = true;
    const vehicles$ = this.swapiService.getProducts(
      'vehicles',
      this.currentPage
    );
    const starships$ = this.swapiService.getProducts(
      'starships',
      this.currentPage
    );

    forkJoin([vehicles$, starships$]).subscribe(
      ([vehicles, starships]) => {
        this.products = [...vehicles.results, ...starships.results];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
}
