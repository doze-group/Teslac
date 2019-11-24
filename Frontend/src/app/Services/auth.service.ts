import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  isAuthenticated(Token: String): Observable<User> {
    return this.Http.get<User>(environment.apiUrlUser + 'id', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Type': 'application/json',
        'Authorization': 'Bearer ' + Token
      })
    });
  }
}
