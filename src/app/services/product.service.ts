import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError<Product>('getProduct')));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError<Product[]>('getProducts')));
  }

  createAuction(product: any): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}/products`, product)
      .pipe(catchError(this.handleError<Product>('createAuction')));
  }

  updateAuction(id: any, data: Product): Observable<Product> {
    delete data._id;
    return this.http
      .put<Product>(`${this.apiUrl}/products/${id}`, data)
      .pipe(catchError(this.handleError<Product>('updateAuction')));
  }

  getPrice(product: Product) {
    return Math.max(...product.bids.map((bid) => bid.amount), 0);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this._snackBar.open(
        'Something went wrong. Check if Crudcrud API did not reach request limit.',
        '',
        {
          duration: 5000,
        }
      );
      return of(result as T);
    };
  }
}
