import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ListConversations',
  templateUrl: './listconversations.component.html',
  styleUrls: ['./listconversations.component.sass']
})
export class ListconversationsComponent implements OnInit {

  @Input() Conversations: Observable<Array<any>>;
  @Input() isGroup: boolean;

  constructor() { }

  ngOnInit() {
  }

}
