import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectCreate } from '../Models/project';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private Http: HttpClient) { }

  getProjects(Token: String): Observable<Array<Project>> {
    return this.Http.get<Array<Project>>('/api/project', { headers: this.Headers(Token) });
  }

  getProjectId(Token: String, Id: String): Observable<Project> {
    return this.Http.get<Project>(environment.apiUrlProject + Id, { headers: this.Headers(Token) });
  }

  createProject(Token: String, Project: ProjectCreate): Observable<Project> {
    return this.Http.post<Project>('/api/project', Project, { headers: this.Headers(Token) });
  }

  modifyProject(Token: String, Project: any, Id: String): Observable<Project> {
    return this.Http.put<Project>(environment.apiUrlProject + Id, Project, { headers: this.Headers(Token) });
  }

  deleteProject(Token: String, Id: String): Observable<Project> {
    return this.Http.delete<Project>(environment.apiUrlProject + Id, { headers: this.Headers(Token) });
  }

  createTable(Token: String, Table: any, Id: String): Observable<Project> {
    return this.Http.put<Project>(environment.apiUrlProject + Id + '/tables', Table, { headers: this.Headers(Token) });
  }

  createTask(Token: String, Task: any, Id: String, IdTable: String): Observable<Project> {
    return this.Http.put<Project>(environment.apiUrlProject + Id + '/tables/' + IdTable + '/tasks', Task, { headers: this.Headers(Token) });
  }

  deleteTask(Token: String, Id: String, IdTable: String, IdTask: String): Observable<Project> {
    return this.Http.delete<Project>(environment.apiUrlProject + Id + '/tables/' + IdTable + '/tasks/' + IdTask, { headers: this.Headers(Token) });
  }

  deleteTable(Token: String, Id: String, IdTable: String): Observable<Project> {
    return this.Http.delete<Project>(environment.apiUrlProject + Id + '/tables/' + IdTable, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
