import { LoginService } from './../services/login.service'; 
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

constructor(
  private router:Router,
  private  loginService: LoginService
) { }

canActivate(Router:ActivatedRouteSnapshot, state:RouterStateSnapshot){
  const currentUser=this.loginService.currentUserValue; 
  const currentToken=this.loginService.currentTokenValue; 
   
  if (currentUser && currentToken) { 
    return true;
    } 
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;

    }

    

}
