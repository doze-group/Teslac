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
}
