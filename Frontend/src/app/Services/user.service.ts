import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient) { }

  getUsers(Token: String): Observable<Array<User>> {
    return this.Http.get<Array<User>>('/api/user', { headers: this.Headers(Token) });
  }

  getUserId(Token: String): Observable<User> {
    return this.Http.get<User>('/api/user/id', { headers: this.Headers(Token) });
  }

  getUserName(Token: String, Name: String): Observable<Array<User>> {
    return this.Http.get<Array<User>>('/api/user/' + Name, { headers: this.Headers(Token) });
  }

  uploadImage(Token: String, image: File): Observable<User> {
    const data = new FormData();
    data.append('image', image);
    return this.Http.put<User>('/api/user/upload', data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + Token,
        'Accept-Type': 'application/json'
      })
    });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
