import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Project {
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
}