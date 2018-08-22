import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loginSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit(): void {
        this.createLoginForm();
    }

    ngOnDestroy(): void {
        if (this.loginSub) {
            this.loginSub.unsubscribe();
        }
    }    

    createLoginForm(): void {
        this.loginForm = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            password: ['', [
                Validators.required
            ]]
        });
    }

    onSubmit(): void {
        this.authService
            .login(this.loginForm.value)
            .subscribe(token => {
                this.authService.saveToken(token);
                this.router.navigate(['/home']);
            })
    }

    get f() { return this.loginForm.controls; }
}
