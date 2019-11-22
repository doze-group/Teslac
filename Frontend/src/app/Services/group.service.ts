import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../Models/group';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private Http: HttpClient) { }

  getGroups(Token: String): Observable<Array<Group>> {
    return this.Http.get<Array<Group>>(environment.apiUrlGroup, { headers: this.Headers(Token) });
  }

  getGroup(Token: String, Id: String): Observable<Group> {
    return this.Http.get<Group>(environment.apiUrlGroup + Id, { headers: this.Headers(Token) });
  }

  createGroup(Token: String, Group: Group): Observable<Group> {
    return this.Http.post<Group>(environment.apiUrlGroup, Group, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
