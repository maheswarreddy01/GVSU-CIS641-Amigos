import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchName = new FormControl('');
  searchOptions: string[] = [];
  showNavBar: boolean = false;
  filteredOptions: Observable<string[]>;
  name = JSON.parse(JSON.stringify( localStorage.getItem('name')));
  constructor(
    private router: Router,
    private sharedservice: SharedService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.authservice.isLoggedIn.subscribe((res: any) => {
      this.showNavBar = res;
    });

    this.sharedservice.searchkeywords.subscribe((res) => {
      this.searchOptions = [...res];

      this.filteredOptions = this.searchName.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  search() {
    this.sharedservice.searchkeyword.next(this.searchName.value);
  }

  orders() {
    this.router.navigateByUrl('/orders');
  }

  logout() {
    this.authservice.logout();
  }
}
