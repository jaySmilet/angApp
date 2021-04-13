import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AngAppAuthService } from './ang-app-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AngAppTokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let angAppAuthService = this.injector.get(AngAppAuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${angAppAuthService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
