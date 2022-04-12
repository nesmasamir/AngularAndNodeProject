import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // productsUrl = 'https://alaahagrassy.herokuapp.com/products';
  // productsUrl = 'https://dummyjson.com/products'
  productsUrl = 'https://project-storeelc.herokuapp.com/products';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    return this.httpClient.get<product[]>(this.productsUrl);
  }

  getProductById(id: string) {
    return this.httpClient.get<product>(this.productsUrl + '/' + id);
  }



}
