import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../sharedModule/models/user.model';
import { UserService } from '../../sharedModule/services/user.service';
import { ChangeEvent } from '../../sharedModule/models/change-event.model';

@Component({
    selector: 'app-admin-user-manage',
    templateUrl: './admin-user-manage.component.html',
    styleUrls: ['./admin-user-manage.component.css']
})
export class AdminUserManageComponent implements OnInit {
    users: User[];
    usersSub: Subscription;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.usersSub = this.userService
            .getAllUsers()
            .subscribe(users => this.users = users);
    }

    handleUserUpdate(e: ChangeEvent<User>): void {
        switch(e.reason) {
            case 'edit':
            const updatedUser = e.data;
            const userIdx = this.users.findIndex(u => u._id === updatedUser._id);
            this.users[userIdx] = updatedUser;
                return;
            case 'delete': 
            const deletedUser = e.data;
            this.users = this.users.filter(u => u._id !== deletedUser._id);
            return;
        }
    }
}
