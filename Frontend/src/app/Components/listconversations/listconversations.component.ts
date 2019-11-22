import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';
import { User } from 'src/app/Models/user';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { GroupService } from 'src/app/Services/group.service';

@Component({
  selector: 'ListConversations',
  templateUrl: './listconversations.component.html',
  styleUrls: ['./listconversations.component.sass']
})
export class ListconversationsComponent implements OnInit {

  @Input() Conversations: Subject<Array<any>>;
  @Input() isGroup: boolean;
  @Input() Change: Function;
  User: User;

  constructor(private ConversationService: ConversationService, private _localStorage: LocalStorageService, private GroupService: GroupService) {
    this.User = this._localStorage.getStorage();
   }

  ngOnInit() {
  }

  StartConversation(Id: String) {
    this.ConversationService.getConversationOne(this.User.Token, Id).subscribe(conversation => {
      this.Change(conversation, true);
    }, err => {
      iziToast.error({
        title: 'Error',
        message: 'Ha ocurrido un error vuelva a intentar'
      });
    });
  }

  StartConversationGroup(Id: String) {
    console.log(this.GroupService);
    this.GroupService.getGroup(this.User.Token, Id).subscribe(group => {
      console.log(group);
    }, err => {
      iziToast.error({
        title: 'Error',
        message: 'Ha ocurrido un error vuelva a intentar'
      });
    });
  }

}
