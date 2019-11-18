import { FormGroup, FormControl, Validators } from "@angular/forms";

export class Forms {
    FormGroup(): FormGroup {
        return new FormGroup({
            DisplayName: new FormControl('', {
                validators: [Validators.required]
            }),
            Members: new FormControl([], {
                validators: [Validators.required]
            })
        });
    }
    FormProject(): FormGroup {
        return new FormGroup({
            Title: new FormControl('', {
                validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
            }),
            Description: new FormControl('', {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(120)]
            })
        });
    }
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