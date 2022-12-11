import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: any = {};
  productReady: boolean = false;
  user_id: string = JSON.parse(JSON.stringify( localStorage.getItem('user_id')));
  constructor(private sharedservices: SharedService, private router: Router) {}
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.sharedservices.productClicked.subscribe((res: any) => {
      console.log('1');
      if (Object.keys(res).length != 0) {
        console.log('2', res);
        this.product = res;
        this.productReady = true;
      } else {
        console.log('ye');
        this.router.navigateByUrl('/home');
      }
    });
  }
  addToCart(product: any, operator: string) {
    if (operator == 'add') {
      if (isNaN(this.product['cart'])) this.product['cart'] = 1;
      else this.product['cart'] += 1;
    } else if (operator == 'minus' && product.cart > 1) {
      this.product.cart -= 1;
    } else {
      this.product.cart = 0;
    }
    console.log('pro', product);
    this.sharedservices
      .updateCart(this.user_id, product, operator)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
