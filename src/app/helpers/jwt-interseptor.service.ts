import { Observable } from 'rxjs';
import { LoginService } from './../services/login.service'; 
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtInterseptorService {

constructor(
  private loginService: LoginService,
   
) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // add authorization header with jwt token if available
  let currentUser = this.loginService.currentUserValue;
  let currentToken= this.loginService.currentTokenValue;
   
  // console.log(currentUser , currentToken);
 
  
  if (currentUser && currentToken) { 
      request = request.clone({
          setHeaders: { 
              Authorization: `${currentToken}`
          }
      });
  }

  return next.handle(request);
}

}
