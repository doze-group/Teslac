import { User } from './../../Models/user';
import { Component, OnInit } from '@angular/core';
import { faIdCardAlt, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import iziToast from 'izitoast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  IdCardAlt = faIdCardAlt;
  Key = faKey;
  Login = faSignInAlt;
  FormControl: FormGroup = new User().FormLogin();
  Submited: Boolean = false;
  Loading: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.Submited = true;
    if (this.FormControl.valid) {
      this.Loading = true;
      setTimeout(() => {
        this.Loading = false;
      }, 1000);
      iziToast.success({
        title: 'Usuario',
        message: `\n\Código: ${this.FormControl.value.Username}\n\Cotraseña: ${this.FormControl.value.Password}`
      })
    } else {
      console.log(this.FormControl.value);
    }
  }

}
