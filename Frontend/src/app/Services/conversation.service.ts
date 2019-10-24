import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private Http: HttpClient) { }

  getConversations(Token: String): Observable<any> {
    return this.Http.get('/api/conversation', { headers: this.Headers(Token) });
  }

  getConversationOne(Token: String, Id: String): Observable<any> {
    return this.Http.get('/api/conversation/' + Id, { headers: this.Headers(Token) });
  }

  createConversation(Token: String, Conversation: any): Observable<any> {
    return this.Http.post('/api/conversation', Conversation, { headers: this.Headers(Token) });
  }

  createMessage(Token: String, Message: any, Id: String): Observable<any> {
    return this.Http.put('/api/conversation/' + Id, Message, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
