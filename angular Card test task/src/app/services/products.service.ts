import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product, ProductResponse } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  getProducts(type: string, page: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}${type}/?page=${page}`).pipe(
      map(response => {
        const products = response.results.map((product: Product) => ({
          ...product,
          image: this.getImageForProduct(product) ,
          type
        }));
        return {
          ...response,
          results: products
        };
      })
    );
  }

  getImageForProduct(product: Product): string {
    let imageUrl = ''; 
    const productClass = product.vehicle_class || product.starship_class;  
    if (productClass === 'wheeled') {
      imageUrl = 'assets/images/wheeled-vehicle.png';
    } else if (productClass === 'repulsorcraft') {
      imageUrl = 'assets/images/repulsorcraft-vehicle.webp';
    } else if ( productClass === 'airspeeder' ){
      imageUrl = 'assets/images/airspeeder-vehicle.avif';
    } else if ( productClass === 'corvette' ){
      imageUrl = 'assets/images/corvette-starship.jpeg';
    } else if ( productClass === 'Star Destroyer' ){
      imageUrl = 'assets/images/star-destroyer-starship.webp';
    } else if ( productClass === 'landing craft' ){
      imageUrl = 'assets/images/landing-craft-starship.jpeg';
    }
  
    return imageUrl;
  }

  searchProducts(type: string, searchTerm: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}${type}/?search=${searchTerm}`).pipe(
      map(response => {
        const products = response.results.map((product: Product) => ({
          ...product,
          image: this.getImageForProduct(product)
        }));
        return {
          ...response,
          results: products
        };
      })
    );
  }
}
