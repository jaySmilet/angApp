import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent } from './angApp/dashboard/dashboard.component';
import { NavbarComponent } from './angApp/navbar/navbar.component';
import { ProductAddComponent } from './angApp/product-add/product-add.component';
import { ProductComponent } from './angApp/product/product.component';
import { AngAppAuthGuard } from './angApp/services/ang-app-auth.guard';
import { SigninComponent } from './angApp/signin/signin.component';
import { SignupComponent } from './angApp/signup/signup.component';

const routes: Routes = [
  {
    path: "angApp", component: NavbarComponent, children: [
      { path: "", component: SigninComponent },
      { path: "signin", component: SigninComponent },
      { path: "signup", component: SignupComponent },
      { path: "dashboard", component: DashboardComponent, canActivate:[AngAppAuthGuard] },
      { path: "product-add", component: ProductAddComponent},
      { path: "product", component: ProductComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
