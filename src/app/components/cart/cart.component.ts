import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { cart } from 'src/app/models/cart';
import { order } from 'src/app/models/order';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: cart[] = [];
  accumlatedPrice: number = 0;
  flag: boolean = false;
  // cartObj: cart = {
  //   id:0,
  //   _id: '',
  //   name: '',
  //   price: 0,
  //   description: '',
  //   productImage: '',
  //   __v: 0,
  //   quantity: 1,
  //   totalPrice: 0
  // };


  constructor(private cartService: CartService, private route: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.displayProductsCart();
    if (this.cartList.length < 0) {
      this.flag = true;
    }
    this.getOrders()
  }

  displayProductsCart() {
    this.cartService.getProductsCart().subscribe(res => {
      this.cartList = res;
      console.log(res)
      this.cartList.map(item => {
        item.Quantity = 1;
        item.totalPrice = item.Product.price;
        if (!isNaN(item.totalPrice)) {
          this.accumlatedPrice += item.totalPrice;
        }
      })
    }, (error) => {
      console.log(error)
    })
  }

  emptyCard() {
    this.cartList = []
  }


  deleteProduct(id: string) {
    this.cartService.deleteProductById(id).subscribe(res => {
      alert("user deleteed")
      this.displayProductsCart();
      if (this.cartList.length < 0) {
        this.flag = true;
      }
    }, (error) => {
      console.log(error)
    })
  }

  calcTotalPrice(product: cart, quantity: string) {

    this.cartList.map(el => {
      console.log(quantity)
      if (el._id === product._id) {

        product.Quantity = +quantity;
        product.totalPrice = product.Product.price * Number(quantity);
      }

    })

  }


  totalCart() {
    console.log(this.cartList)
    this.accumlatedPrice = 0
    this.cartList.forEach(el => {
      if (!isNaN(el.totalPrice)) {
        this.accumlatedPrice += el.totalPrice;
      }

    })
  }

  checkOut(allProducts: any[]) {
    // this.route.navigate(['/user'])
    allProducts.map(el => {
      let obj = {
        _id: el._id,
        Product: {
          _id: el.Product._id,
          name: el.Product.name
        },
        Quntity: el.Quantity
      }
      console.log(obj)
      this.orderService.postOrder(obj).subscribe(el => {
        console.log("added")
      })

    })

  }

  getOrders() {
    this.orderService.getOrder().subscribe(res => {
      console.log("test", res)
    })
  }
}
