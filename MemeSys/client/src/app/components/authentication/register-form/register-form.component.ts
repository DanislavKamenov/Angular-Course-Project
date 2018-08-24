import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { StaticCustomValidators } from '../../sharedModule/validators/static-custom.validators';
import { CustomValidators } from '../../sharedModule/validators/custom.validators';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    customAvatar: boolean = false;
    hideInfo: boolean = true;
    registerSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit(): void {
        this.createRegisterForm();
    }

    ngOnDestroy(): void {
        if(this.registerSub) {
            this.registerSub.unsubscribe();
        }
    }

    createRegisterForm(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Zа-яА-Я]+')]],
            avatar: [''],
            password: ['', [
                Validators.required,
                StaticCustomValidators.customPattern(/^.{3,16}$/, 'range'),
                StaticCustomValidators.customPattern(/[^\wа-яА-Я\d]*(([0-9]+.*[A-Za-zа-яА-Я]+.*)|[A-Za-zа-яА-Я]+.*([0-9]+.*))/, 'letterAndNumber'),
                StaticCustomValidators.customPattern(/^[a-zA-Zа-яА-Я0-9]+$/, 'noSpecialCharacters')]],
            repeatPassword: ['', [
                Validators.required,
                new CustomValidators().mustMatch('password')]]
        });
    } 

    enableCustomAvatar(): void {
        this.customAvatar = true;
        this.f.avatar.setValidators([
            Validators.required, 
            StaticCustomValidators.customPattern(/\.jpg$|\.jpeg$|\.png$/, 'memtype')]);
        this.f.avatar.updateValueAndValidity();
    }

    disableCustomAvatar(): void {
        this.customAvatar = false;
        this.f.avatar.clearValidators();
        this.f.avatar.reset();
    }

    onPasswordFocus(): void {
        this.hideInfo = false;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.authService
                .register(this.registerForm.value)
                .subscribe((token) => {
                    this.authService.saveToken(token);
                    this.router.navigate(['/home']);
                })
        }
    }

    get f() { return this.registerForm.controls; }

}
