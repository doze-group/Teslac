import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { faIdCardAlt, faKey, faUserPlus, faAt } from '@fortawesome/free-solid-svg-icons';
import iziToast from 'izitoast';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  FormControl: FormGroup = new User().FormSignUp();
  Submited: Boolean = false;
  Loading: Boolean = false;
  Icons: Array<any> = [faIdCardAlt, faKey, faUserPlus, faAt];

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
      this.FormControl.reset();
    } else {
      console.log(this.FormControl.value);
    }
  }

}
