import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { WishListService } from 'src/app/services/wish-list.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartListLength: number = 0;
  wishListLength: number = 0;



  constructor(public loginService: LoginService, private CartService: CartService, private wishlist: WishListService) { }

  ngOnInit(): void {
    this.allCartList();
    this.wishListitems()
  }
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  allCartList() {
    this.CartService.getProductsCart().subscribe(res => {
      this.cartListLength = res.length;
    })

  }

  wishListitems() {
    this.wishListLength = this.wishlist.getAllWishList().length
  }

}
