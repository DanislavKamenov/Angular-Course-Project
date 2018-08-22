import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class StaticCustomValidators {

    static customPattern(patternRe: RegExp, errorName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !patternRe.test(control.value) ? { [errorName]: true } : null;
        }
    }
}