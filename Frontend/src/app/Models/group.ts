import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Group {
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
}