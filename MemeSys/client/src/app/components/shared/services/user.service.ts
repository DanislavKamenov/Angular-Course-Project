import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.model';
import { ServerToken } from '../models/server-token.model';
import { ServerResponse } from '../models/server-response.model';
import { AuthService } from '../../authentication/shared/services/auth.service';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private allUrl: string = `${root}user/`;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private jwtHelper: JwtHelperService) { }

    getAllUsers(): Observable<User[]> {
        return this.http
        .get<ServerResponse<User[]>>(this.allUrl)
        .pipe(
            map(res => res.data.users)
        );
    }

    editUser(userId: string, userProps: Object): Observable<User> {
        const editUrl = `${this.allUrl}${userId}`;

        return this.http
            .put<ServerResponse<User>>(editUrl, userProps)
            .pipe(
                tap(res => this.authService.saveToken(res.data.token)),
                map(res => res.data.user)
            );
    }

    deleteUser(user: User): Observable<User> {
        const deleteUrl = `${this.allUrl}${user._id}`;

        return this.http
            .delete<ServerResponse<User>>(deleteUrl)
            .pipe(
                map(res => res.data.user)
            );
    }

    isLoggedIn(): boolean {
        return !!(this.token && this.currentUser);
    }

    get currentUser(): User | null {
        return this.token ? this.token.user || null : null;
    }   

    private get rawToken(): string | null {
        return localStorage.getItem('token');
    }

    private get token(): ServerToken | null {
        try {
            const token = this.rawToken;
            if (token && this.jwtHelper.isTokenExpired(this.rawToken)) {
                sessionStorage.clear();
                return null;
            }
            return this.jwtHelper.decodeToken(token);
        }
        catch {
            return null;
        }
    }
}
