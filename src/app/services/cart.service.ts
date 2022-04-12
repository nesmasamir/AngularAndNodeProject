import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
// cartList: cart[] = []
// cartList: any = [];
// cartArr:cart[]=[];
export class CartService implements OnInit {

  // serverUrl = "http://localhost:3000/cartitems";
  serverUrl = "https://project-storeelc.herokuapp.com/carts";
  cartListLength: any;
  numOfItems = new BehaviorSubject<any>([].length);

  constructor(private httpCart: HttpClient) { }

  ngOnInit(): void {
    this.cartListData()
  }


  addProductToCart(data: any) {
    return this.httpCart.post<cart>(this.serverUrl, data)

  }

  getProductsCart(): Observable<any> {
    return this.httpCart.get<cart>(this.serverUrl)

  }

  cartListData() {
    this.getProductsCart().subscribe(res => {
      this.cartListLength = res.length;
    })
  }

  deleteProductById(id: string):Observable<any> {
    return this.httpCart.delete<cart>(this.serverUrl + "/" + id)
      .pipe(map((res: any) => {
        console.log(id)
        return res;
      }))

  }

  deletCart(): Observable<any> {
    return this.httpCart.delete<any>(this.serverUrl)
  }










  // getProducts() {
  //   return this.productList.asObservable();
  // }

  // setProduct(product: any) {
  //   this.cartList.push(...product);
  //   this.productList.next(product);
  // }
  // addToCart(product: any) {
  //   this.cartList.push(product);
  //   this.productList.next(this.cartList);
  // }
  // getTotalPrice() {

  // }

  // removeCartItem(product: any) {
  //   this.cartList.map((el: any, index: number) => {
  //     if (product.id === el.id) {
  //       this.cartList.splice(index, 1);
  //     }
  //   })

  // }

  // removeAll() {
  //   this.cartList = [];
  //   this.productList.next(this.cartList )
  // }






}
