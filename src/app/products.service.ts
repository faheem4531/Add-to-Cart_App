import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  private baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}vehicles/`)
      .pipe(
        map((response) =>
          response.results.map((vehicle: any) => ({
            ...vehicle,
            image: 'https://picsum.photos/200/200',
          }))
        )
      );
  }

  getStarships(): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}starships/`)
      .pipe(
        map((response) =>
          response.results.map((starship: any) => ({
            ...starship,
            image: 'https://picsum.photos/200/200',
          }))
        )
      );
  }

  getProducts(type: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${type}/?page=${page}`);
  }
}
