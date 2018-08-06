import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService) {
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

    ngOnInit() { }

    get f() { return this.loginForm.controls; }

    onSubmit(): void {
        this.authService.login(this.loginForm.value).subscribe();
    }
}
