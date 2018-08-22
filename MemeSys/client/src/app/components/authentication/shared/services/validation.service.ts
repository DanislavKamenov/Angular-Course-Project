import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {    
    constructor() { }

    isEmpty(c: AbstractControl): boolean {
        return !!(c.value.trim().length === 0);
    }

    hasError(errorName: string, c: AbstractControl): boolean {
        if (c.errors) {
            return !!c.errors[errorName];
        }
        return false;
    }
}
