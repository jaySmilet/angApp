import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngAppAuthService } from './ang-app-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AngAppAuthGuard implements CanActivate {

  constructor(private angAppAuthService:AngAppAuthService,private router:Router){}

  canActivate():boolean {
    if (this.angAppAuthService.signedIn()) {
      return true;
    } else {
      this.router.navigate(["angApp/signin"]);
      return false;
    }
  }
  
}
