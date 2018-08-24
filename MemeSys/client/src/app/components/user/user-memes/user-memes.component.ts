import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedDataService } from '../../shared/services/sharedData.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-user-memes',
    templateUrl: './user-memes.component.html',
    styleUrls: ['./user-memes.component.css']
})
export class UserMemesComponent implements OnInit {
    oldCategory: string;
    changesSub: Subscription;
    constructor(
        private dataService: SharedDataService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.dataService.changeDisplayCategory('user');
    }

    ngOnDestroy(): void {
        this.dataService.backToPreviousCategory();
    }

    get user(): User {
        return this.userService.currentUser;
    }
}
