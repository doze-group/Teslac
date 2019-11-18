import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faSms } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Services/user.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';
import { User } from 'src/app/Models/user';
import { Conversation } from 'src/app/Models/conversation';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'ListUsers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.sass']
})
export class ListusersComponent implements OnInit {

  Icons: Array<any> = [faSearch, faSms];
  Users: Subject<Array<User>> = new BehaviorSubject([]);
  BackupUsers: User[] = [];
  User: User;
  @Input() Conversations: Subject<Array<Conversation>>;
  @Input() Change: Function;

  constructor(private UserService: UserService, private ConversationService: ConversationService, private _localStorage: LocalStorageService) { 
    this.User = this._localStorage.getStorage();
  }

  ngOnInit() {
    this.UserService.getUsers(this.User.Token).subscribe(users => {
      console.log(users);
      this.Users.next(users);
      this.BackupUsers = users;
    },err => {
      iziToast.error({message: 'Error al obtener los usuarios'});
    });
  }

  StartConversation(Id: String) {
    this.Conversations.subscribe(conversation => {
      let conver = conversation.filter(item => item.Members[0]._id === Id);
      if (conver.length >= 1) {
        this.ConversationService.getConversationOne(this.User.Token, Id).subscribe(one => {
          this.Change(one, true);
        });
      } else {
        this.ConversationService.createConversation(this.User.Token, { Members: [this.User._id, Id] }).subscribe(conversation => {
          this.Change(conversation);
        }, err => {
          iziToast.error({
            message: 'Ha ocurrido un error vuelva a intentar'
          });
        });
      }
    });
  }

  ChangeInput(event) {
    if (event.target.value === '')
      this.Users.next(this.BackupUsers);
    else
      this.Users.next(this.BackupUsers.filter(item => item.DisplayName.includes(event.target.value.toUpperCase())))
  }

}
