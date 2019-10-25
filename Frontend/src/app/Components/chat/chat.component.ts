import { Component, OnInit, Input } from '@angular/core';
import { Subject, BehaviorSubject, Subscribable, Subscriber, Subscription } from 'rxjs';
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
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Chat: any = {};
  isGroup: boolean = false;
  Icons: any[] = [faLocationArrow, faHandPointLeft];
  LoadingMessage: Subject<boolean> = new BehaviorSubject(false);
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Suscriptions: Array<Subscription> = [];

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
    this.Suscriptions.push(this.ChatBind.subscribe(chat => {
      if (JSON.stringify(chat) !== '{}') {
        this.isGroup = chat.UrlImage !== undefined;
        if (chat.UrlImage === undefined) {
          this.Chat = Object.assign({ 'UrlImage': chat.Members[0].UrlImage, 'DisplayName': chat.Members[0].DisplayName }, chat);
        }
        this.Messages.next(chat.Messages);
        this.Loading.next(true);
        setTimeout(() => {
          for (let index = document.getElementById('scroll').scrollTop; index <= document.getElementById('scroll').scrollHeight; index++) {
            setTimeout(() => {
              document.getElementById('scroll').scrollTop = index;
            }, 100);
          }
        }, 500);
      }
    }));
    this.isTyping();
    this.HandlerMessage();
  }

  ngOnDestroy(): void {
    this.Suscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  isTyping() {
    this.Suscriptions.push(this.ChatService.Listener('Chat:Typing').subscribe(data => {
      document.getElementById('typing').innerHTML = data.Room ===
        this.Chat._id && data.Username !== 'is not typing' ?
        `<h6 className="animated fadeIn" style="font-size: 11px;">${this.isGroup ? data.Username : ''} Esta Escribiendo...</h6>` : '';
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }));
  }

  HandlerMessage() {
    this.Suscriptions.push(this.ChatService.Listener('Chat:Message').subscribe(data => {
      if (data.Room === this.Chat._id) {
        this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
        this.Messages.subscribe(messages => {
          messages.push(data.Message);
        }).unsubscribe()
      }
    }));
  }

  Filter(user: any) {
    if (user.User !== this.User.User._id) {
      let fil = this.Chat.Members.filter(item => item._id === user.User);
      return fil.length >= 1 ? fil[0].DisplayName : 'Usuario Eliminado';
    } else {
      return this.User.User.DisplayName;
    }
  }

  FilterBool(user: any): boolean {
    if (user.User !== this.User.User._id) {
      let fil = this.Chat.Members.filter(item => item._id === user.User);
      return fil.length >= 1;
    } else {
      return false;
    }
  }

  FilterImage(user: any): boolean {
    if (user.User !== this.User.User._id) {
      let fil = this.Chat.Members.filter(item => item._id === user.User);
      return fil.length >= 1 ? fil[0].UrlImage : 'Usuario Eliminado';
    } else {
      return this.User.User.UrlImage;
    }
  }

  PushMessage() {
    this.LoadingMessage.next(true);
    this.ConversationService.createMessage(this.User.Token, {
      'Message': (document.getElementById('Message') as any).value,
      'User': this.User.User._id
    }, this.Chat._id).toPromise().then(message => {
      this.ChatService.Emit('Chat:Message', {
        'Room': this.Chat._id,
        'Message': message.Messages[message.Messages.length - 1],
        'Member': {
          'DisplayName': this.Chat.DisplayName,
          'UrlImage': this.Chat.UrlImage,
          'Message': this.isGroup ? this.User.User.DisplayName + ': ' + message.Messages[message.Messages.length - 1] : message.Messages[message.Messages.length - 1]
        }
      });
      this.Messages.subscribe(messages => {
        messages.push(message.Messages[message.Messages.length - 1]);
      }).unsubscribe();
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
      (document.getElementById('Message') as any).value = '';
      this.LoadingMessage.next(false);
      setTimeout(() => {
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
      }, 100);
    })
  }

}
