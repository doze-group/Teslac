import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User, UserRegistrer } from 'src/app/Models/user';
import { faIdCardAlt, faKey, faUserPlus, faAt, faIdCard, faUserTag, faUser } from '@fortawesome/free-solid-svg-icons';
import iziToast from 'izitoast';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  FormControl: FormGroup = new User().FormSignUp();
  Submited: Boolean = false;
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Icons: Array<any> = [faIdCardAlt, faKey, faUserPlus, faAt, faIdCard, faUserTag, faUser];
  Roles: Array<String> = ['Estudiante', 'Docente', 'Administrativo'];
  
  constructor(private Auth: AuthService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('User')) this._router.navigate(['/home']);
  }

  onSubmit() {
    this.Loading.next(true);
    if (this.FormControl.valid) {
      this.Auth.SignUp(this.FormControl.value as UserRegistrer).then(user => {
        localStorage.setItem('User', JSON.stringify(user));
        this._router.navigate(['/home']);
      }).catch(err => {
        console.log(err);
        iziToast.error({ message: 'Ha ocurrido un error vuelva a intentar' });
      });
    }
    this.Loading.next(false);
    this.Submited = true;
  }

}
