import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject:BehaviorSubject<User>;
  private currentTokenSubject:BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentTokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentUser = this.currentUserSubject.asObservable();    
  }
  public get currentUserValue(): User {
    return  this.currentUserSubject.value;
  }
  public get currentTokenValue(): User {
    return  this.currentTokenSubject.value ;
  }
  login(email, password) { 
    return this.http.post<any>(`${environment.apiUrl}auth/login`, {  email, password })
    .pipe(map(user => {   
      console.log(user);    
      localStorage.setItem('currentUser', JSON.stringify(user.data.user.name));
      localStorage.setItem('currentUserEmail', JSON.stringify(user.data.user.email));
      localStorage.setItem('currentToken', JSON.stringify(user.data.token));     
      this.currentUserSubject.next(user);
      return user;
       }));
  
  }
  logout() { 
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUserEmail');
    this.currentUserSubject.next(null);
}
 
}
