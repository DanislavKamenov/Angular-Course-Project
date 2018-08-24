import { Component, OnInit } from '@angular/core';
import { UserService } from '../sharedModule/services/user.service';
import { User } from '../sharedModule/models/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    isUserLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }

    get user(): User {
        console.log('here');
        return this.userService.currentUser;
    }
}
