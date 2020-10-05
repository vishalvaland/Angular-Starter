import { User } from './../../models/user';
import { LoginService } from './../../services/login.service'; 
import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html', 
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router:Router,
    private  loginService:LoginService,
  ) {
   this.loginService.currentUser.subscribe(x => this.currentUser = x);  
    console.log(this.currentUser);       
   }

  ngOnInit() {
  }

  
  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
