import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // serverUrl = "http://localhost:3000/orders";
  serverUrl = "https://project-storeelc.herokuapp.com/orders";
  constructor(private httpClient: HttpClient) { }

  postOrder(order: any) {
    return this.httpClient.post(this.serverUrl, order)

  }
  getOrder() {
    return this.httpClient.get(this.serverUrl)

  }
}
