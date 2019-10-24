import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { faLocationArrow, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/Services/chat.service';
import { ConversationService } from 'src/app/Services/conversation.service';

@Component({
  selector: 'App-Chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  @Input() ChatBind: Subject<any>;
  @Input() Change: Function;
  Messages: Subject<Array<any>> = new BehaviorSubject([]);
  ArrayMessage: any;
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Chat: any = {};
  isGroup: boolean = false;
  Icons: any[] = [faLocationArrow, faHandPointLeft];
  LoadingMessage: Subject<boolean> = new BehaviorSubject(false);
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));

  constructor(private ChatService: ChatService, private ConversationService: ConversationService) { }

  OnChange(text) {
    if (text.target.value === '')
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
  }

  onKeyPress(event) {
    if (event.which === 13 && !event.shiftKey)
      this.PushMessage();
    else
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: this.User.User.DisplayName })
  }

  ngOnInit() {
    this.ChatBind.subscribe(chat => {
      this.isGroup = chat.UrlImage !== undefined;
      if (chat.UrlImage === undefined) {
        this.Chat = Object.assign({ 'UrlImage': chat.Members[0].UrlImage, 'DisplayName': chat.Members[0].DisplayName }, chat);
      }
      this.Messages.next(chat.Messages);
      this.ArrayMessage = chat.Messages;
      this.Loading.next(true);
      setTimeout(() => {
        for (let index = document.getElementById('scroll').scrollTop; index <= document.getElementById('scroll').scrollHeight; index++) {
          setTimeout(() => {
            document.getElementById('scroll').scrollTop = index;
          }, 100);
        }
      }, 500);
    });
    this.isTyping();
    this.HandlerMessage();
  }

  isTyping() {
    this.ChatService.Listener('Chat:Typing').subscribe(data => {
      document.getElementById('typing').innerHTML = data.Room ===
        this.Chat._id && data.Username !== 'is not typing' ?
        `<h6 className="animated fadeIn" style="font-size: 11px;">${this.isGroup ? data.Username : ''} Esta Escribiendo...</h6>` : '';
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    });
  }

  HandlerMessage() {
    this.ChatService.Listener('Chat:Message').subscribe(data => {
      if (data.Room === this.Chat._id) {
        this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
        this.ArrayMessage = this.ArrayMessage.concat([data.Message]);
        this.Messages.next(this.ArrayMessage);
      }
    })
  }

  Filter(user: any) {
    let fil = this.Chat.Members.filter(item => item._id !== user.User);
    return fil.length >= 1 ? fil[0].DisplayName : this.User.User.DisplayName;
  }

  FilterBool(user: any): boolean {
    let fil = this.Chat.Members.filter(item => item._id !== user.User);
    return fil.length >= 1;
  }

  FilterImage(user: any): boolean {
    let fil = this.Chat.Members.filter(item => item._id !== user.User);
    return fil.length >= 1 ? fil[0].UrlImage : this.User.User.UrlImage;
  }

  PushMessage() {
    this.LoadingMessage.next(true);
    this.ConversationService.createMessage(this.User.Token, {
      'Message': document.getElementById('Message').value,
      'User': this.User.User._id
    }, this.Chat._id).toPromise().then(message => {
      this.ChatService.Emit('Chat:Message', {
        'Room': this.Chat._id,
        'Message': message.Messages[message.Messages.length - 1],
        'Member': this.User.User._id
      });
      this.ArrayMessage = this.ArrayMessage.concat([message.Messages[message.Messages.length - 1]]);
      this.Messages.next(this.ArrayMessage);
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
      document.getElementById('Message').value = '';
      this.LoadingMessage.next(false);
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    })
  }

}
