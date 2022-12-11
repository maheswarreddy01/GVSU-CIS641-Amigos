import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Forms
import { ReactiveFormsModule } from '@angular/forms';

//third-party modules
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';

//angular material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
//Custom components
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { StripeComponent } from './stripe/stripe.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminUserViewComponent } from './admin-user-view/admin-user-view.component';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    StripeComponent,
    PaymentSuccessComponent,
    OrdersComponent,
    AdminUserViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot(
      'pk_test_51M46QHCGxBdl6xbujMjRFFSD6m7rnh855n4HGkTCuv8JvCAO8Mg0er3RGoqo9IRYIoFmHagSAC1Yuvo0f2iaBf54002Kcar7Zt'
    ),

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
