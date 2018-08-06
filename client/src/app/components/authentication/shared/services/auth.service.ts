import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInput } from '../models/login.input-model';
import { RegisterInput } from '../models/register.input-model';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../core/models/server-response.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl: string = root + 'auth/login';
    private registerUrl: string = root + 'auth/signup';

    constructor(private http: HttpClient) { }

    login(payload: LoginInput): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(this.loginUrl, payload);
    }

    register(payload: RegisterInput): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(this.registerUrl, payload);
    }
}