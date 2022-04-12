import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/models/product';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishListArr: product[] = []
  constructor(private wishListService: WishListService) { }

  ngOnInit(): void {
  this.wishListArr=  this.wishListService.getAllWishList()
  console.log(this.wishListArr)
  }

  deleteWishListItem(id:string){
    this.wishListService.deleteWishList(id)
  }


  
}
