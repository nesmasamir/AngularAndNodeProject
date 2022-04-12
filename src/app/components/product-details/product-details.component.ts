import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: product = {
    // id: 0,
    _id: '',
    name: '',
    price: 0,
    description: '',
    productImage: '',
    __v: 0

  };
  constructor(
    private ProductService: ProductService,
    private CartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.displayProductDetails(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void { }
  displayProductDetails(id: any) {
    this.ProductService.getProductById(id).subscribe(
      (product) => {
        this.currentProduct = product;
        console.log(product);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addToCart(product: product) {
    this.CartService.addProductToCart(product).subscribe(res => {
      alert("product added");
      console.log(product);
    },
      (error) => {
        console.log(error);
      })

  }
}
