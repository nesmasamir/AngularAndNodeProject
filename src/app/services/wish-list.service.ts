import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  // serverUrl = "http://localhost:3000/wishlist";
  wishesList: product[] = []
  numOfItems = new BehaviorSubject<any>([].length);

  constructor(private httpList: HttpClient) {

  }

  getAllWishList() {
    let wishList = localStorage.getItem("wishesList");
    if (wishList) {
      return this.wishesList = JSON.parse(wishList);
    }
    else {
      return this.wishesList = []
    }
  }
 

  addWishList(item: product) {
    if (this.wishesList) {
      let checkExist = this.wishesList.find(pro => {
        return item._id === pro._id
      })
      if (!checkExist) {
        alert("added")
        this.wishesList.push(item);
        this.saveWishList();
        this.numOfItems.next(this.wishesList.length)
      }
      else {
        console.log("item already exist")
      }
    }


  }

  deleteWishList(id: string) {
    this.wishesList.splice(+id, 1);
    this.saveWishList()
  }

  saveWishList() {
    localStorage.setItem("wishesList", JSON.stringify(this.wishesList))

  }
}
