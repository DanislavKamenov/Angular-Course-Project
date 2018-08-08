import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LoginInput } from '../models/login.input-model';
import { RegisterInput } from '../models/register.input-model';
import { ServerResponse } from '../../../core/models/server-response.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl: string = root + 'auth/login';
    private registerUrl: string = root + 'auth/signup';
    private login$: Subscription;
    private register$: Subscription;

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService) { 
            console.log('new authService instance');
        }    

    login(payload: LoginInput): void {
        this.login$ = this.http
            .post<ServerResponse>(this.loginUrl, payload)
            .pipe(
                catchError(this.handleError),
                map(res => res.data),
                tap(this.saveToken)
            )
            .subscribe(() => this.router.navigate(['/home']));
    }

    clearLoginSubscription() {
        if (this.login$) this.login$.unsubscribe();
    }

    register(payload: RegisterInput): void {
        this.register$ = this.http
            .post<ServerResponse>(this.registerUrl, payload)
            .pipe(
                catchError(this.handleError),
                map(res => res.data),
                tap(this.saveToken)
            )
            .subscribe(() => this.router.navigate(['/home']));
    }

    clearRegisterSubscription() {
        if (this.register$) this.register$.unsubscribe();
    }

    logout() {
        localStorage.clear();
        this.toastr.success('You have successfully logged out.', 'Success:');
        this.router.navigate['/home'];
    }

    private saveToken(data) {
        localStorage.setItem('token', data.token);
    }

    private handleError = (res: HttpErrorResponse) => {
        //Had to bind 'this'.
        console.log(res);
        this.toastr.error(`${res.error.message || res.error}`, `${res.statusText}:`);
        return throwError('Authentication Failed.');
    }
}