import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: product[] = []
  addedToWishList: boolean = false


  constructor(private ProductService: ProductService, private route: Router, private loginServices: LoginService, private cartService: CartService, private wishlist: WishListService) { }

  ngOnInit(): void {

    this.showSomeProducts()
  }

  showSomeProducts() {
    this.ProductService.getProducts().subscribe(res => {
      this.products = res["AllProduct"];
    },
      (error) => {
        console.log(error);
      })
  }
  addToCart(product: product) {
    if (this.loginServices.isLoggedIn()) {

      this.cartService.addProductToCart(product).subscribe(res => {
        alert("product added");
        console.log(product);
      },
        (error) => {
          console.log(error);
        })
    } else {

      this.route.navigate(['/login'])
    }


  }
  addToWishList(product: product) {
    if (this.loginServices.isLoggedIn()) {
      this.wishlist.addWishList(product);

    } else {

      this.route.navigate(['/login'])
    }

  }
  // deleteWishListItem(id: string) {
  //   if (this.addedToWishList) {
  //     this.wishlist.deleteWishList(id).subscribe(res => {
  //       alert('item deleted');
  //       this.addedToWishList = false;

  //       // this.displayWishList();
  //     })
  //   }


  // }

}
