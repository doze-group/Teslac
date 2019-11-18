import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation, ConversationCreate } from '../Models/conversation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private Http: HttpClient) { }

  getConversations(Token: String): Observable<Array<Conversation>> {
    return this.Http.get<Array<Conversation>>(environment.apiUrlConversation, { headers: this.Headers(Token) });
  }

  getConversationOne(Token: String, Id: String): Observable<Conversation> {
    return this.Http.get<Conversation>(environment.apiUrlConversation + Id, { headers: this.Headers(Token) });
  }

  createConversation(Token: String, Conversation: ConversationCreate): Observable<Conversation> {
    return this.Http.post<Conversation>(environment.apiUrlConversation, Conversation, { headers: this.Headers(Token) });
  }

  createMessage(Token: String, Message: any, Id: String): Observable<Conversation> {
    return this.Http.put<Conversation>(environment.apiUrlConversation + Id, Message, { headers: this.Headers(Token) });
  }

  Headers(Token: String): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
      'Authorization': 'Bearer ' + Token
    });
  }
}
