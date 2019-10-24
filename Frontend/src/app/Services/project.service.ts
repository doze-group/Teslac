import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private Http: HttpClient) { }

  getProjects(Token: String): Observable<any> {
    return this.Http.get('/api/project', { headers: this.Headers(Token) });
  }

  getProjectId(Token: String, Id: String): Observable<any> {
    return this.Http.get('/api/project/' + Id, { headers: this.Headers(Token) });
  }

  createProject(Token: String, Project: any): Observable<any> {
    return this.Http.post('/api/project', Project, { headers: this.Headers(Token) });
  }

  modifyProject(Token: String, Project: any, Id: String): Observable<any> {
    return this.Http.put('/api/project/' + Id, Project, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
