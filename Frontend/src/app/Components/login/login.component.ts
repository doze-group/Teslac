import { Component, OnInit } from '@angular/core';
import { faIdCardAlt, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  IdCardAlt = faIdCardAlt;
  Key = faKey;
  Login = faSignInAlt;

  constructor() { }

  ngOnInit() {
  }

}
