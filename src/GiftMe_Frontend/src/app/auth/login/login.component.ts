import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forgot = {
    click: 0,
    email: 0,
    otp_verificationforgot: 0
  }
  submittionType = 'Sign In';
  otp = new FormControl();
  otp_verification: boolean = false;
  signInDetails = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {
    let id: any = localStorage.getItem('user_id');
    console.log('ud', id);
    if (id?.length == 24) {
      this.authservice.LoggedIn.next(true);
      this.router.navigateByUrl('home');
    }
  }

  formSubmit(details: any) {
    if (this.submittionType == 'Sign In') {
      this.authservice.signIn(details.email, details.password);
    } else {
      this.otp_verification = true;
      this.authservice.otpVerification(details.email);
    }
  }
  signUp() {
    let details: any = this.signInDetails.value;
    details['otp'] = this.otp.value;
    this.authservice.signUp(details);
  }
  changeSubmittionType(chekc = false) {
    if (this.submittionType == 'Sign In') {
      this.submittionType = 'Sign Up';
    } else {
      this.submittionType = 'Sign In';
    }
    if(chekc){
      this.submittionType = 'Sign In';
      this.forgot = {
        click: 0,
        email: 0,
        otp_verificationforgot: 0
      }
    }
  }
  forgotpas(type: any) {
    if (type == 'click')
      this.forgot.click = 1
    else if(type == "email"){
      this.forgot.otp_verificationforgot = 1
    }
    else if( type == 'otp'){
      this.forgot.otp_verificationforgot = 0
      this.forgot.email = 1
    }
    else if(type == 'pass')
      {
        this.forgot = {
          click: 0,
          email: 0,
          otp_verificationforgot: 0
        }
      }
  }
}
