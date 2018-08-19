import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    makeAPICall(): void {
        this.http.get('api/meme').subscribe(console.log);
    }

    isUserLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }
}