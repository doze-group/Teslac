import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faSms } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user.service';
import { Observable, Subject } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ListUsers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.sass']
})
export class ListusersComponent implements OnInit {

  Icons: Array<any> = [faSearch, faSms];
  Users: Observable<Array<any>>;
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  @Input() Conversations: Subject<Array<any>>;
  @Input() Change: Function;

  constructor(private UserService: UserService, private ConversationService: ConversationService) { }

  ngOnInit() {
    this.Users = this.UserService.getUsers(this.User.Token);
  }

  StartConversation(Id: String) {
    this.Conversations.subscribe(conversation => {
      let conver = conversation.filter(item => item.Members[0]._id === Id);
      if (conver.length >= 1) {
        this.ConversationService.getConversationOne(this.User.Token, Id).toPromise().then(one => {
          console.log(one);
          this.Change(one, true);
        });
      } else {
        this.ConversationService.createConversation(this.User.Token, { 'Members': [this.User.User._id, Id] }).toPromise().then(conversation => {
          this.Change(conversation);
        }).catch(err => {
          iziToast.error({
            title: 'Error',
            message: 'Ha ocurrido un error vuelva a intentar'
          });
        });
      }
    }).unsubscribe();
  }

}
