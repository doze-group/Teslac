import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegistrer } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(User: UserLogin): Promise<any> {
    return this.Http.post('/api/user/login', User).toPromise();
  }

  SignUp(User: UserRegistrer): Promise<any> {
    return this.Http.post('/api/user', User).toPromise();
  }

  isAuthenticated(): boolean {
    const User = localStorage.getItem('User');
    if (User != null){
      return true;
    }
    return false;
  }
}
