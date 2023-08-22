import { Component, OnInit } from '@angular/core';
import { forkJoin, Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  currentPage: number = 1;
  totalPages: number = 0;
  vehiclePlaceholderImageUrl: string = 'assets/images/vehicle-placeholder.jpeg';
  starshipPlaceholderImageUrl: string =
    'assets/images/starship-placeholder.jpeg';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const vehicles$ = this.productsService.getProducts(
      'vehicles',
      this.currentPage
    );
    const starships$ = this.productsService.getProducts(
      'starships',
      this.currentPage
    );

    forkJoin([vehicles$, starships$]).subscribe(
      ([vehicles, starships]) => {
        this.isLoading = false;
        this.products = [...vehicles.results, ...starships.results];
        const maxTotal = Math.max(vehicles.count, starships.count);
        this.totalPages = Math.ceil(maxTotal / 10);
        this.fillMissingImages();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  fillMissingImages() {
    for (const product of this.products) {
      if (!product.image) {
        product.image =
          product.type === 'vehicles'
            ? this.vehiclePlaceholderImageUrl
            : this.starshipPlaceholderImageUrl;
      }
    }
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: Product) {
    this.cartService.removeFromCart(item);
  }

  isInCart(item: Product): boolean {
    const cartItems = this.cartService.getCartItems();
    const matchingCartItem = cartItems.find(cartItem => cartItem.url === item.url);
    return !!matchingCartItem;
  }

  extractIdFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
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
    const vehicles$ = this.productsService.getProducts(
      'vehicles',
      this.currentPage
    );
    const starships$ = this.productsService.getProducts(
      'starships',
      this.currentPage
    );

    forkJoin([vehicles$, starships$]).subscribe(
      ([vehicles, starships]) => {
        this.products = [...vehicles.results, ...starships.results];
        const maxTotal = Math.max(vehicles.count, starships.count);
        this.totalPages = Math.ceil(maxTotal / 10);
        this.fillMissingImages();
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.setupSearchInput();
  }

  private setupSearchInput() {
    const searchInput = document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    const searchInput$ = fromEvent(searchInput, 'input').pipe(
      debounceTime(1000)
    );

    searchInput$.subscribe(() => {
      this.searchProducts();
    });
  }

  searchProducts() {
    if (this.searchTerm) {
      this.isLoading = true;
      const vehicles$ = this.productsService.searchProducts(
        'vehicles',
        this.searchTerm
      );
      const starships$ = this.productsService.searchProducts(
        'starships',
        this.searchTerm
      );

      forkJoin([vehicles$, starships$]).subscribe(
        ([vehicles, starships]) => {
          this.products = [...vehicles.results, ...starships.results];
          const maxTotal = Math.max(vehicles.count, starships.count);
          this.totalPages = Math.ceil(maxTotal / 10);
          this.fillMissingImages();
          this.currentPage = 1;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      this.fetchAllData();
    }
  }

  private searchTermChanged$ = new Subject<void>();

  updateSearchTerm() {
    this.searchTermChanged$.next();
  }

  getProductQuantity(product: Product) {
    return this.cartService.getProductQuantity(product);
  }

}
