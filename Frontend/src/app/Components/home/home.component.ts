import { Component, OnInit } from '@angular/core';
import { faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle, faUserTag, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subject, BehaviorSubject } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';
import { ChatService } from 'src/app/Services/chat.service';
import { FormGroup } from '@angular/forms';
import { Group } from 'src/app/Models/group';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Icons: Array<any> = [faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle, faUserTag, faUsers, faEdit];
  FormControl: FormGroup = new Group().FormGroup();
  Submited: boolean = false;
  ArraySub: any[] = [];
  Conversations: Subject<Array<any>> = new BehaviorSubject([]);
  Main: Subject<boolean> = new BehaviorSubject(true);
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Chat: Subject<any> = new BehaviorSubject({});

  constructor(private ConversationService: ConversationService, private ChatService: ChatService) { }

  ngOnInit() {
    console.log(this.User.User);
    this.ConversationService.getConversations(this.User.Token).toPromise().then(conversations => {
      this.ChatService.Connect();
      let filter = [];
      conversations.map(item => {
        item.Members = item.Members.filter(item => item._id !== this.User.User._id);
        filter.push(item);
      });
      this.ArraySub = filter;
      this.Conversations.next(filter);
      this.Loading.next(true);
      this.ChatService.JoinRooms(conversations);
    }).catch(err => {
      iziToast.error({
        title: 'Error',
        message: 'Error al encontrar tus datos intente de nuevo'
      });
    });
    this.HandlerMessage();
  }

  ChangeMain = (Chat: any = {}, Exits: boolean = false) => {
    if ('{}' !== JSON.stringify(Chat) && !Exits) {
      this.ArraySub.push(Chat);
      this.Conversations.next(this.ArraySub);
    } else if ('{}' !== JSON.stringify(Chat)) {
      Chat.Members = Chat.Members.filter(item => item._id !== this.User.User._id);
    }
    this.Chat.next(Chat);
    this.Main.next('{}' === JSON.stringify(Chat));
  }

  HandlerMessage() {
    this.ChatService.Listener('Chat:Message').subscribe(data => {
      this.Chat.subscribe(chat => {
        if (JSON.stringify(chat) === '{}' && data.Room !== chat._id) {
          iziToast.show({
            title: data.Member.DisplayName,
            class: 'animInsideTrue',
            message: data.Member.Message.Message,
            position: 'bottomCenter',
            animateInside: false,
            image: data.Member.UrlImage,
            imageWidth: 70,
            displayMode: 2,
            layout: 2,
            transitionIn: 'bounceInUp',
            transitionOut: 'fadeOutUp',
          });
        }
      }).unsubscribe();
    })
  }

  LogOut() {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: '¿Esta Seguro de Salir?',
      position: 'center',
      buttons: [
        ['<button><b>Si</b></button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
          localStorage.clear();
          window.location.reload();
        }, true],
        ['<button><b>No</b></button>', function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
      ],
    });
  }

}
