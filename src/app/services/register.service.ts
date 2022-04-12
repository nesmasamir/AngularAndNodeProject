import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  USER_API: string = 'https://project-storeelc.herokuapp.com/users/register';

  constructor(private http: HttpClient) {}

  createUser(value: User) {
    return this.http.post(this.USER_API, value);
  }
}