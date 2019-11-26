import { Component, OnInit } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-config-project',
  templateUrl: './config-project.component.html',
  styleUrls: ['./config-project.component.sass']
})
export class ConfigProjectComponent implements OnInit {

  Icons: Array<any> = [faSearch, faTimes];

  constructor() { }

  ngOnInit() {
  }

}
