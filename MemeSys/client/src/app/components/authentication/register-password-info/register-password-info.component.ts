import { Component, Input } from '@angular/core';
import { ValidationService } from '../shared/services/validation.service';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-register-password-info',
    templateUrl: './register-password-info.component.html',
    styleUrls: ['./register-password-info.component.css']
})
export class RegisterPasswordInfoComponent {
    @Input() password: AbstractControl;

    constructor(private validationService: ValidationService) { }

    isEmpty(c: AbstractControl): boolean {
        return this.validationService.isEmpty(c);
    }

    hasError(errorName: string, c: AbstractControl): boolean {
        return this.validationService.hasError(errorName, c);
    }
}
