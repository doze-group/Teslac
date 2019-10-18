import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ds-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() Messages: Array<any>;

  constructor() { }

  ngOnInit() {
    console.log(this.Messages);
  }

}
