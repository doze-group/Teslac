import { Component, OnInit } from '@angular/core';
import { faIdCardAlt, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import iziToast from 'izitoast';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  FormControl: FormGroup = new User().FormLogin();
  Submited: Boolean = false;
  Loading: Boolean = false;
  Icons: Array<any> = [faIdCardAlt, faKey, faSignInAlt];

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
      });
      this.FormControl.reset();
    } else {
      console.log(this.FormControl.value);
    }
  }

}
