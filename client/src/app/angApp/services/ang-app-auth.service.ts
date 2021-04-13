import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngAppAuthService {

  private baseUri = "http://localhost:3000";
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user) {
    return this.http.post<any>(this.baseUri + "/" + "signup", user);
  }

  signInUser(user) {
    return this.http.post<any>(this.baseUri + "/" + "signin", user);
  }

  signedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  SignOutUser(){
    localStorage.removeItem('token');
    this.router.navigate(["angApp/signin"]);
  }

  getUserData(){
    return this.http.get<any>(this.baseUri+"/user/username");
  }
}
