import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) { }
  url= "https://reqres.in/api/users?per_page=4&page=";

  getdata(pageNo:number){
    // return this.http.get(`this.url${pageNo}`)
    return this.http.get(this.url+pageNo);
  }
}
