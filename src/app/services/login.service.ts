import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // MAIN_LINK: string = 'https://jobs-nodejs.herokuapp.com/api/users/signin/';
  MAIN_LINK: string = 'https://project-storeelc.herokuapp.com/users/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    return this.http.post<{ token: string }>(this.MAIN_LINK, user);
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token') || undefined;
    if (!token) return false;
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) return false;

    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}