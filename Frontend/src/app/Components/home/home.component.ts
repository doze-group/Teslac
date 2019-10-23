import { Component, OnInit } from '@angular/core';
import { faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Icons: Array<any> = [faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle];
  ArraySub: any[] = []
  Conversations: Subject<Array<any>> = new BehaviorSubject([]);
  Main: Subject<boolean> = new BehaviorSubject(true);
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Chat: Subject<any> = new BehaviorSubject({});

  constructor(private ConversationService: ConversationService) { }

  ngOnInit() {
    this.ConversationService.getConversations(this.User.Token).toPromise().then(conversations => {
      let filter = [];
      conversations.map(item => {
        item.Members = item.Members.filter(item => item._id !== this.User.User._id);
        filter.push(item);
      });
      this.ArraySub = filter;
      this.Conversations.next(filter);
      this.Loading.next(true);
    }).catch(err => {
      iziToast.error({
        title: 'Error',
        message: 'Error al encontrar tus datos intente de nuevo'
      });
    })
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

}
