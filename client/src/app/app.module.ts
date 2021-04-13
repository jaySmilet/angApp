import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './angApp/signup/signup.component';
import { SigninComponent } from './angApp/signin/signin.component';
import { DashboardComponent } from './angApp/dashboard/dashboard.component';
import { NavbarComponent } from './angApp/navbar/navbar.component';
import { AngAppTokenInterceptorService } from './angApp/services/ang-app-token-interceptor.service';
import { ProductAddComponent } from './angApp/product-add/product-add.component';
import { ProductComponent } from './angApp/product/product.component';
import { SharedModule } from './angApp/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    NavbarComponent,
    ProductAddComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AngAppTokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
