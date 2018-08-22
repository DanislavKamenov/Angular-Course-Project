import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

import { SharedDataService } from '../../../shared/services/sharedData.service';
import { LoginInput } from '../models/login.input-model';
import { RegisterInput } from '../models/register.input-model';
import { ServerResponse } from '../../../shared/models/server-response.model';
import { ServerToken } from '../../../shared/models/server-token.model';
import { User } from '../../../shared/models/user.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl: string = root + 'auth/login';
    private registerUrl: string = root + 'auth/signup';

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService,
        private dataService: SharedDataService,
        private toastr: ToastrService) { }    

    login(payload: LoginInput): Observable<ServerToken> {
        return this.http
            .post<ServerResponse<ServerToken>>(this.loginUrl, payload)
            .pipe(
                map(res => res.data.token)
            )
    }

    register(payload: RegisterInput): Observable<ServerToken> {
        return this.http
            .post<ServerResponse<ServerToken>>(this.registerUrl, payload)
            .pipe(
                map(res => res.data.token)
            );
    }

    logout() {
        localStorage.clear();
        this.dataService.changeDisplayCategory('hot');
        this.toastr.success('You have successfully logged out.', 'Success:');
        this.router.navigate['/home'];
    }

    saveToken(token) {
        localStorage.setItem('token', token);
    }
}