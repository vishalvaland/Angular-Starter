import { Observable } from 'rxjs';
import { Product } from './../models/product';
import { environment } from './../../environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(
  private http:HttpClient,
) { }

create(  name:string, 
  code:number, 
 description:string, 
  image:File, 
 price:number,
 category:string): Observable<any> {

  var formData: any = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("code", code);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("category", category); 

  return this.http.post(`${environment.apiUrl}product`, formData)
}

}


