import { Component } from '@angular/core';

import { User } from '../../sharedModule/models/user.model';
import { UserService } from '../../sharedModule/services/user.service';
import { AuthService } from '../../authentication/shared/services/auth.service';


@Component({
    selector: 'app-user-dropdown',
    templateUrl: './user-dropdown.component.html',
    styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {
    state = 'hidden';
    constructor(
        private userService: UserService,
        private authService: AuthService) { }

    changeState() {
        this.state = 'expand';
    }

    logout(): void {
        this.authService.logout();
        console.log('cleared');
    }

    tryGetUser(): User {
        return this.userService.currentUser;
    }
}
