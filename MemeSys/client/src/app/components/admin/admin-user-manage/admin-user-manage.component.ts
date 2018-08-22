import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { ChangeEvent } from '../../shared/models/change-event.model';

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
        const deletedUser = e.data;
        this.users = this.users.filter(u => u._id !== deletedUser._id);
    }
}
