import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService implements OnInit {
  localUrl: string = 'http://localhost:8080/api';
  searchkeywords = new Subject<any>();
  searchkeyword = new Subject<any>();
  productClicked = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getCards() {
    return this.http.get(`${this.localUrl}/getcards`);
  }
  getCart(user_id: string) {
    return this.http.get(`${this.localUrl}/getcart/${user_id}`);
  }
  getorders(user_id: string) {
    return this.http.get(`${this.localUrl}/getorders/${user_id}`);
  }
  updateCart(user_id: string, product: any, type: string) {
    return this.http.post(`${this.localUrl}/updatecart`, {
      user_id,
      product,
      type,
    });
  }

  updateorders(user_id: string, product: any, type: string) {
    return this.http.post(`${this.localUrl}/updateorders`, {
      user_id,
      product,
      type,
    });
  }

  paymentIntent(amount: number) {
    return this.http.post(`${this.localUrl}/payment-intent`, {
      amount: amount.toFixed(2),
    });
  }
  clearCart(id: string) {
    return this.http.post(`${this.localUrl}/delete-cart`, { id: id });
  }
}
