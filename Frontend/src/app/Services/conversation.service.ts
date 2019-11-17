import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../Models/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private Http: HttpClient) { }

  getConversations(Token: String): Observable<Array<Conversation>> {
    return this.Http.get<Array<Conversation>>('/api/conversation', { headers: this.Headers(Token) });
  }

  getConversationOne(Token: String, Id: String): Observable<Conversation> {
    return this.Http.get<Conversation>('/api/conversation/' + Id, { headers: this.Headers(Token) });
  }

  createConversation(Token: String, Conversation: Conversation): Observable<Conversation> {
    return this.Http.post<Conversation>('/api/conversation', Conversation, { headers: this.Headers(Token) });
  }

  createMessage(Token: String, Message: any, Id: String): Observable<Conversation> {
    return this.Http.put<Conversation>('/api/conversation/' + Id, Message, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
