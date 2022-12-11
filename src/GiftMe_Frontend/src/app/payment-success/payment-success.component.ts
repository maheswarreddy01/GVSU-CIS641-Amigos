import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  user_id = JSON.parse(JSON.stringify( localStorage.getItem('user_id')));
  constructor(private sharedservices: SharedService) {}

  ngOnInit(): void {
    this.sharedservices.clearCart(this.user_id).subscribe((res) => {});
  }
}
