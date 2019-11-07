import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Http: HttpClient) { }

  getUsers(Token: String): Observable<any> {
    return this.Http.get('/api/user', { headers: this.Headers(Token) });
  }

  getUserId(Token: String): Observable<any> {
    return this.Http.get('/api/user/id', { headers: this.Headers(Token) });
  }

  getUserName(Token: String, Name: String): Observable<any> {
    return this.Http.get('/api/user/' + Name, { headers: this.Headers(Token) });
  }

  uploadImage(Token: String, image: File): Observable<any> {
    const data = new FormData();
    data.append('image', image);
    return this.Http.put('/api/user/upload', data, {
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
