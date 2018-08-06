import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const authRoutes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ]
})
export class AuthRoutingModule { }
