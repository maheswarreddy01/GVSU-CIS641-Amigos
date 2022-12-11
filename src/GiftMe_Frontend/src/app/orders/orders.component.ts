import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  id: string = JSON.parse(JSON.stringify(localStorage.getItem('user_id')));
  products = []
  constructor(
    private sharedservices: SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedservices.getorders(this.id).subscribe((res: any) => {
      if (res) {
        if(res['data'] && res['data'][0])
          this.products = res['data'][0]['products'];
        console.log(this.products);
    
      }
    });
  }

}
