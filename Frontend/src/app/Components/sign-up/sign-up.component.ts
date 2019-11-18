import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User, UserRegistrer } from 'src/app/Models/user';
import { faIdCardAlt, faKey, faUserPlus, faAt, faIdCard, faUserTag, faUser } from '@fortawesome/free-solid-svg-icons';
import iziToast from 'izitoast';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { Forms } from 'src/app/Models/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  FormControl: FormGroup = new Forms().FormSignUp();
  Submited: Boolean = false;
  Loading: Subject<boolean> = new BehaviorSubject(false);
  Icons: Array<any> = [faIdCardAlt, faKey, faUserPlus, faAt, faIdCard, faUserTag, faUser];
  Roles: Array<String> = ['Estudiante', 'Docente', 'Administrativo'];
  
  constructor(private Auth: AuthService, private _router: Router, private _localStorage: LocalStorageService) { }

  ngOnInit() {
    if (localStorage.getItem('User')) this._router.navigate(['/home']);
  }

 async onSubmit() {
    this.Loading.next(true);
    console.log(this.FormControl.valid);
    if (this.FormControl.valid) {
      await this.Auth.SignUp(this.FormControl.value as UserRegistrer).subscribe(user => {
        this._localStorage.setItem(user);
        this._router.navigate(['/home']);
      }, (err: HttpErrorResponse) => {
        if(err.status === 406){
          iziToast.error({message: 'Error verifique los datos ingresados'});
        }else{
          iziToast.error({message: 'Error inesperado intente de nuevo'});
        }
      });
    }
    this.Loading.next(false);
    this.Submited = true;
  }

}
