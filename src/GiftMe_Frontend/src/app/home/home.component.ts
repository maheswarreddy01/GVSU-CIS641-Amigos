import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'cors';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  posters: any;
  poster: any;
  changebackground: boolean = false;
  filterd_category: any = {};
  filters = new FormControl('');
  filtersList: any = [];
  greetingcards_filter_list: any = [];
  greetingcards: any = [];
  cartProducts: any = {};
  user_id: any;
  constructor(private sharedservices: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.user_id = JSON.parse(JSON.stringify( localStorage.getItem('user_id')));

    this.sharedservices.getCards().subscribe((res: any) => {
      this.greetingcards = [...res['data']];
      this.populateCategories();
    });
    this.sharedservices.searchkeyword.subscribe((res: any) => {
      if (res) {
        let searchArray: any = new Array();
        searchArray.push(res);
        this.filters.setValue(searchArray);
        this.applyFilters();
      }
    });

    //  this.http.post('http://localhost:8080/api/insertcard',this.greetingcards).subscribe(res=>{
    //   console.log(res)
    //  })
  }

  ngAfterViewInit() {
    this.posters = document.querySelector('.posters');
    this.poster = document.querySelector('.poster');
    this.posterChange();
  }
  posterChange() {
    setInterval(() => {
      if (this.posters) {
        const width: any = this.poster?.clientWidth;
        this.posters.scrollLeft += width;
        if (this.posters.scrollLeft >= width * 1.5) {
          this.posters.scrollLeft = 0;
        }
      }
    }, 5000);
  }
  populateCategories() {
    for (const key in this.greetingcards) {
      if (
        !this.filterd_category.hasOwnProperty(
          this.greetingcards[key]['category']
        )
      ) {
        this.filtersList.push(this.greetingcards[key]['category']);
        this.sharedservices.searchkeywords.next(this.filtersList);
        this.filterd_category[this.greetingcards[key]['category']] =
          new Array();
        this.filterd_category[this.greetingcards[key]['category']].push(
          this.greetingcards[key]
        );
      } else {
        this.filterd_category[this.greetingcards[key]['category']].push(
          this.greetingcards[key]
        );
      }
    }
  }
  applyFilters() {
    this.greetingcards_filter_list = [];
    let filters: any = this.filters.value;
    if (filters.length) {
      for (let i = 0; i < filters.length; i++) {
        if (this.filterd_category.hasOwnProperty(filters[i])) {
          this.greetingcards_filter_list.push(
            ...this.filterd_category[filters[i]]
          );
        }
      }
    }
  }
  cardClicked(card: any) {
    this.sharedservices.productClicked.next(card);
    this.router.navigateByUrl('/product');
  }
  addToCart(event: Event, card: any, type: string) {
    event.stopPropagation();

    for (let i = 0; i < this.greetingcards.length; i++) {
      if (this.greetingcards[i]['name'] == card['name']) {
        if (!this.greetingcards[i].hasOwnProperty('cart')) {
          this.greetingcards[i]['cart'] = 1;
        } else if (type == 'add') {
          this.greetingcards[i]['cart'] += 1;
        } else {
          this.greetingcards[i]['cart'] > 0
            ? (this.greetingcards[i]['cart'] -= 1)
            : 0;
        }
        this.updateCart(this.greetingcards[i], type);
      }
    }
  }
  updateCart(product: any, type: string) {
    //********************************************* */
    this.sharedservices
      .updateCart(this.user_id, product, type)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
