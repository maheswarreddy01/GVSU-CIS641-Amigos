import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  StripeService,
  StripeCardComponent,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import {
  StripeCardElement,
  StripeCardElementOptions,
  StripeElements,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
})
export class StripeComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  _totalAmount: number = 0;
  // card: any;
  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '14px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: '',
  };

  constructor(
    private sharedservices: SharedService,
    public dialogRef: MatDialogRef<StripeComponent>,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this._totalAmount = data['total_amount'];
  }

  ngOnInit(): void {
    this.sharedservices
      .paymentIntent(this._totalAmount)
      .subscribe((res: any) => {
        this.elementsOptions.clientSecret = res.client_secret;
      });
  }
  pay() {
    this.stripeService
      .confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required',
      })
      .subscribe((res: any) => {
        console.log('res', res);
        if (res.paymentIntent.status === 'succeeded') {
          this.dialogRef.close({ res: 'success' });
        } else {
          if (res.error) {
            alert({ success: false, error: res.error.message });
            this.dialogRef.close({ res: 'failed' });
          }
        }
      });
  }
}
