import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegistrer, User } from '../Models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(User: UserLogin): Observable<User> {
    return this.Http.post<User>(environment.apiUrlLogin, User);
  }

  SignUp(User: UserRegistrer): Observable<User> {
    return this.Http.post<User>(environment.apiUrlUser, User);
  }

  isAuthenticated(): boolean {
    const User = localStorage.getItem('User');
    if (User != null){
      return true;
    }
    return false;
  }
}
