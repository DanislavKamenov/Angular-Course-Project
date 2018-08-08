import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../services/user.service';
import { AuthService } from '../../authentication/shared/services/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private userService: UserService) { }

    logout(): void {
        this.authService.logout();

        console.log('cleared');
    }

    makeAPICall(): void {
        this.http.get('api/meme').subscribe(console.log);
    }

    get isUserLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }
}