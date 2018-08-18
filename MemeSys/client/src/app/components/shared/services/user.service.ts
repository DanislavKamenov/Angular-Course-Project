import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user.model';
import { ServerToken } from '../models/server-token.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private jwtHelper: JwtHelperService) { }    

    isLoggedIn(): boolean {
        return !!(this.rawToken && this.user);
    }

    get user(): User | null {
        return this.token ? this.token.user || null : null;
    }   

    private get rawToken(): string | null {
        return localStorage.getItem('token');
    }

    private get token(): ServerToken | null {
        try {
            const token = this.rawToken;
            if (this.jwtHelper.isTokenExpired(this.rawToken)) {
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
