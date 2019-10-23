import { Component, OnInit } from '@angular/core';
import { faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  User: { User: any, Token: String } = JSON.parse(localStorage.getItem('User'));
  Icons: Array<any> = [faUsers, faSignOutAlt, faAngleDoubleDown, faPlusCircle];

  constructor() { }

  ngOnInit() {
  }

}
