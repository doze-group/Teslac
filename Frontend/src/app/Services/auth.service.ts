import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../Models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private Http: HttpClient) { }

  Login(User: UserLogin) {
    this.Http.post('', User).subscribe();
  }

  SignUp(User: any) {
    this.Http.post('', User).subscribe();
  }
}
