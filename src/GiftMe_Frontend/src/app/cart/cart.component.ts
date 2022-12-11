import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

import { StripeComponent } from '../stripe/stripe.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent implements OnInit {
  addressDetails = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
  });

  totalCartValue: number = 0;
  _totalAmount: number = 0;
  taxes: number = 0;

  cartProducts: any = [];
  id: string = JSON.parse(JSON.stringify(localStorage.getItem('user_id')));

  constructor(
    private router: Router,
    private sharedservices: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sharedservices.getCart(this.id).subscribe((res: any) => {
      if (res) {
        let products = res['data'][0]['products'];
        this.cartProducts = [...products];
        this.calculateTotal(this.cartProducts);
      }
    });
  }

  calculateTotal(products: any, index?: any) {
    this.taxes = 0;
    if (index >= 0 && products[index]) {
      this.totalCartValue += products[index]['amount'];
    } else {
      products.forEach((element: any) => {
        this.totalCartValue += element.amount * element.cart;
      });
    }
    this.taxes = (6.25 / 100) * this.totalCartValue;
    this._totalAmount = this.taxes + this.totalCartValue;
  }

  productCount(index: any, operator: string) {
    let selected_index = this.cartProducts[index];
    if (operator == 'add') {
      this.cartProducts[index]['cart'] += 1;
    } else if (operator == 'minus' && selected_index['cart'] > 1) {
      this.cartProducts[index]['cart'] = selected_index['cart'] - 1;
    } else {
      this.cartProducts.splice(index, 1);
      console.log('cart', this.cartProducts, index);
    }
    this.calculateTotal(this.cartProducts, index);
    this.sharedservices
      .updateCart(this.id, selected_index, operator)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  checkoutPage() {
    console.log(this._totalAmount);
    const dialogRef = this.dialog.open(StripeComponent, {
      width: '350px',
      data: { total_amount: this._totalAmount },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.res == 'success') {
        let orders = {
          'productId': this.cartProducts.map( (p:any) => p._id),
          'total': this._totalAmount
        }
        console.log("hello hi", orders);
        this.sharedservices
          .updateorders(this.id, orders, 'false')
          .subscribe((res: any) => {
            this.router.navigateByUrl('/payment-successfull');
          });
      }
    });
  }
}
