import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegistrer, User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(User: UserLogin): Observable<User> {
    return this.Http.post<User>('/api/user/login', User);
  }

  SignUp(User: UserRegistrer): Observable<User> {
    return this.Http.post<User>('/api/user', User);
  }

  isAuthenticated(): boolean {
    const User = localStorage.getItem('User');
    if (User != null){
      return true;
    }
    return false;
  }
}
