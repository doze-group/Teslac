import { Component, OnInit } from '@angular/core';
import { faIdCardAlt, faKey, faSignInAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import iziToast from 'izitoast';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  FormControl: FormGroup = new User().FormLogin();
  Submited: Boolean = false;
  Loading: Boolean = false;
  Icons: Array<any> = [faIdCardAlt, faKey, faSignInAlt, faIdCard];

  constructor(private Auth: AuthService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('User')) this._router.navigate(['/home']);
  }

  onSubmit() {
    this.Submited = true;
    if (this.FormControl.valid) {
      this.Loading = true;
      this.Auth.Login(this.FormControl.value).then(user => {
        localStorage.setItem('User', JSON.stringify(user));
        this._router.navigate(['/home']);
      }).catch(err => {
        iziToast.error({
          title: 'Validación',
          message: 'Compruebe que sus credenciales sean correctas'
        });
      });
      this.FormControl.reset();
    }
  }

}
