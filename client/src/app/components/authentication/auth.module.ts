import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { LoginFormComponent } from './login-form/login-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterPasswordInfoComponent } from './register-password-info/register-password-info.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
    ],
    declarations: [LoginFormComponent, RegisterFormComponent, RegisterPasswordInfoComponent]
})
export class AuthModule { }
