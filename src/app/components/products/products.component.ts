import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { cart } from 'src/app/models/cart';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product-service.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArr: product[] = [];
  totalProducts: number = 0;
  page: number = 1;
  searchValue: string = '';
  wishListrArr: product[] = [];
  cartlistArr: cart[] = []
  addedToWishList: boolean = false;
  test: number = 0;


  constructor(private ProductService: ProductService, private route: Router, private loginServices: LoginService, private CartService: CartService, private wishList: WishListService) { }

  ngOnInit(): void {
    this.displayAllProducts();
    this.CartService.getProductsCart().subscribe(res => {
      this.cartlistArr = res

    })

  }
  displayAllProducts() {
    this.ProductService.getProducts().subscribe(
      (products) => {
        console.log(products)
        this.productsArr = products["AllProduct"];
        console.log(this.productsArr)

        this.totalProducts = this.productsArr.length;
        console.log(this.totalProducts)

      },
      (error) => {
        console.log(error);
      }
    );

  }
  // onSearchText(searchVal: any) {
  //   this.searchValue = searchVal;
  //   console.log(this.searchValue)

  // }
  addToCart(product: product) {
    if (this.loginServices.isLoggedIn()) {
      this.CartService.addProductToCart(product).subscribe(res => {
        alert("product added");
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
      this.wishList.addWishList(product);

    } else {

      this.route.navigate(['/login'])
    }

  }

  // deleteWishListItem(id: string) {
  //   if (this.addedToWishList) {
  //     this.wishList.deleteWishList(id).subscribe(res => {
  //       alert('item deleted');
  //       this.addedToWishList = false;

  //       // this.displayWishList();
  //     })
  //   }


  // }

  searchProducts() {
    if (this.searchValue === '') {
      this.displayAllProducts();
    } else {
      this.productsArr = this.productsArr.filter(el => {
        return el.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())

      })
    }

  }

}
