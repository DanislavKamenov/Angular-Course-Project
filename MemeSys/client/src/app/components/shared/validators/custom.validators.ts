import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static customPattern(patternRe: RegExp, errorName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !patternRe.test(control.value) ? { [errorName]: true } : null;
        }
    }

    static mustMatch(otherControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            if (!control.parent) return null;
            const thisControl: AbstractControl = control;
            const otherControl: AbstractControl = control.parent.get(otherControlName);

            return thisControl.value !== otherControl.value ? { 'mustMatch': true } : null;
        };
    }
}