import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'App-Chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  @Input() ChatBind: Subject<any>;
  Messages: Subject<Array<any>> = new BehaviorSubject([]);
  MessagesArray: any[] = [];
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Chat: any = {};
  isGroup: boolean = false;
  Icons: any[] = [faLocationArrow];

  constructor() { }

  ngOnInit() {
    this.ChatBind.subscribe(chat => {
      this.isGroup = chat.UrlImage !== undefined;
      if(chat.UrlImage === undefined){
        this.Chat = Object.assign({'UrlImage': chat.Members[0].UrlImage, 'DisplayName': chat.Members[0].DisplayName})
      }
      this.MessagesArray = chat.Messages
      this.Messages.next(chat.Messages);
      this.Loading.next(true);
    });
  }

}
