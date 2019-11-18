import { Component, OnInit } from '@angular/core';
import { faIdCardAlt, faKey, faSignInAlt, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FormGroup } from '@angular/forms';
import iziToast from 'izitoast';
import { Forms } from 'src/app/Models/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  FormControl: FormGroup = new Forms().FormLogin();
  Submited: Boolean = false;
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Icons: Array<any> = [faIdCardAlt, faKey, faSignInAlt, faIdCard];

  constructor(private Auth: AuthService, private _router: Router, private _localstorage: LocalStorageService) { }

  ngOnInit() {
    if (localStorage.getItem('User')) this._router.navigate(['/home']);
  }

  onSubmit() {
    if (this.FormControl.valid) {
      this.Loading.next(true);
      this.Auth.Login(this.FormControl.value).subscribe(user => {
        this._localstorage.setItem(user);
        this._router.navigate(['/home']);
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          iziToast.error({
            message: 'Ha ocurrido un error inesperado'
          });
        } else {
          iziToast.error({
            message: 'Compruebe que sus credenciales sean correctas'
          });
        }
      });
    }
    this.Loading.next(false);
    this.Submited = true;
  }

}
