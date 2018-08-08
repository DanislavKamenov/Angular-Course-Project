import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    validationMessages = {
        required: (name: string) => `${name} is required.`,
        pattern: (name: string) => `${name} is invalid.`,
        email: (name: string) => `${name} is invalid.`,
        letterAndNumber: (name: string) => `${name} must contain at least one letter and one number.`,
        noSpecialCharacters: (name: string) => `${name} must not contain special characters.`,
        range: (name: string) => `${name} must be between 3 - 16 characters long.`,
        mustMatch: (name: string) => `Passwords must match.`
    }
    errors: object = {};
    
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

    setMessage(cName: string, eName: string): void {
        if (!this.errors[cName]) this.errors[cName] = [];
        this.errors[cName] = [...this.errors[cName], {message: this.validationMessages[eName](cName), type: eName}];
    }

    checkErrors(c: AbstractControl, cName: string): void {
        this.errors[cName] = [];
        if (c.errors) {
            Object.keys(c.errors).forEach(eName => {
                this.setMessage(cName, eName);
            });
        }
    }

    validateForm(f: FormGroup) {
        Object.keys(f.controls).forEach(c => {            
            f.controls[c].valueChanges.subscribe(() => this.checkErrors(f.controls[c], c));
        });
    }
}
