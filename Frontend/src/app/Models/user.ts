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
            Institutional: new FormControl('', {
                validators: [Validators.required, Validators.minLength(10)]
            }),
            DisplayName: new FormControl('', {
                validators: [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
            }),
            Role: new FormControl('', {
                validators: [Validators.required]
            })
        });
    }
}

export class UserLogin {
    Username: String;
    Password: String;

    constructor(Username: String, Password: String) {
        this.Username = Username;
        this.Password = Password;
    }
}

export class UserRegistrer {
    Username: String;
    Password: String;
    Email: String;
    Institutional: String;
    DisplayName: String;
    Role: String;

    constructor(Username: String, Password: String, Email: String, Institutional: String, Role: String, DisplayName: String) {
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.Institutional = Institutional;
        this.DisplayName = DisplayName;
        this.Role = Role;
    }
}