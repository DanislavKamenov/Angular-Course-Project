import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/services/validation.service';
import { CustomValidators } from '../../shared/validators/custom.validators';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnDestroy {
    registerForm: FormGroup;
    hideInfo: boolean = true;
    constructor(
        private fb: FormBuilder,
        private validationService: ValidationService,
        private authService: AuthService) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Zа-яА-Я]+')]],
            avatar: ['', [
                Validators.required, 
                CustomValidators.customPattern(/\.jpg$|\.jpeg$|\.png$/, 'memtype')]],
            password: ['', [
                Validators.required,
                CustomValidators.customPattern(/^.{3,16}$/, 'range'),
                CustomValidators.customPattern(/[^\wа-яА-Я\d]*(([0-9]+.*[A-Za-zа-яА-Я]+.*)|[A-Za-zа-яА-Я]+.*([0-9]+.*))/, 'letterAndNumber'),
                CustomValidators.customPattern(/^[a-zA-Zа-яА-Я0-9]+$/, 'noSpecialCharacters')]],
            repeatPassword: ['', [
                Validators.required,
                CustomValidators.mustMatch('password')]]
        })
    }

    ngOnDestroy(): void {
        this.authService.clearRegisterSubscription();
    }

    onPasswordFocus(): void {
        this.hideInfo = false;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value);
        }
    }

    get f() { return this.registerForm.controls; }

    get errors() { return this.validationService.errors; }

}
