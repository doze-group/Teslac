import { FormControl, FormGroup, Validators } from '@angular/forms';

export class User {
    FormLogin() {
        return new FormGroup({
            Username: new FormControl('', {
                validators: [Validators.required, Validators.minLength(10)]
            }),
            Password: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }
    FormSignUp() {
        return new FormGroup({
            Username: new FormControl('', {
                validators: [Validators.required, Validators.minLength(10)]
            }),
            Password: new FormControl('', {
                validators: [Validators.required]
            }),
            Email: new FormControl('', {
                validators: [Validators.required, Validators.email]
            }),
            Role: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }
}
