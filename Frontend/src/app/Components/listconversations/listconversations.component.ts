import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationService } from 'src/app/Services/conversation.service';
import iziToast from 'izitoast';

@Component({
  selector: 'ListConversations',
  templateUrl: './listconversations.component.html',
  styleUrls: ['./listconversations.component.sass']
})
export class ListconversationsComponent implements OnInit {

  @Input() Conversations: Subject<Array<any>>;
  @Input() isGroup: boolean;
  @Input() Change: Function;
  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));

  constructor(private ConversationService: ConversationService) { }

  ngOnInit() {
  }

  StartConversation(Id: String) {
    this.ConversationService.getConversationOne(this.User.Token, Id).toPromise().then(conversation => {
      this.Change(conversation, true);
    }).catch(err => {
      iziToast.error({
        title: 'Error',
        message: 'Ha ocurrido un error vuelva a intentar'
      });
    });
  }

}
