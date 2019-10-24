import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Group {
    FormGroup(): FormGroup {
        return new FormGroup({
            Name: new FormControl('', {
                validators: [Validators.required]
            }),
            Members: new FormControl([], {
                validators: [Validators.required]
            })
        });
    }
}