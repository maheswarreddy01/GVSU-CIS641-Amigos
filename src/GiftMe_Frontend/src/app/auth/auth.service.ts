import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  localUrl: string = 'http://localhost:8080/api';
  LoggedIn = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}

  get isLoggedIn() {
    return this.LoggedIn.asObservable();
  }

  otpVerification(email: string) {
    console.log(email);
    this.http
      .post(`${this.localUrl}/otp`, { email: email })
      .subscribe((res) => {
        console.log(res);
      });
  }

  signIn(email: string, password: string) {
    this.http
      .post(`${this.localUrl}/signin`, { email: email, password: password })
      .subscribe(async (res: any) => {
        this._snackBar.open(res.message, 'ok');
        if (res.status == 'ok') {
          localStorage.setItem('user', JSON.stringify(res.data));
          localStorage.setItem('user_id', res.data._id);
          localStorage.setItem('name', res.data.name);
          this.LoggedIn.next(true);
          this.router.navigateByUrl('home');
        }
      });
  }

  signUp(details: any) {
    details['admin'] = false
    this.http
      .post(`${this.localUrl}/signup`, details)
      .subscribe(async (res: any) => {
        if (res.status == 'ok') {
          await localStorage.setItem('user_id', res.data._id);
          await localStorage.setItem('name', res.data.name);
          this.LoggedIn.next(true);
          this.router.navigateByUrl('/home');
        }
        this._snackBar.open(res.message, 'ok');
      });
  }

  logout() {
    localStorage.clear();
    this.LoggedIn.next(false);
    this.router.navigateByUrl('/login');
  }
}
