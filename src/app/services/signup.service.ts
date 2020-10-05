import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

constructor(private http:HttpClient) { }

register(user : User) {
  return this.http.post(`${environment.apiUrl}auth/register`, user);
}

}
 