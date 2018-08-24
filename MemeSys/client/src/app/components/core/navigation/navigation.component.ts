import { Component } from '@angular/core';

import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    constructor(
        private userService: UserService) { }

    isUserLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }
}