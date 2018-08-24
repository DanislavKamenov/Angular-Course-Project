import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sharedModule/services/user.service';
import { User } from '../../sharedModule/models/user.model';
import { ChangeEvent } from '../../sharedModule/models/change-event.model';

@Component({
    selector: 'app-profile-panel',
    templateUrl: './profile-panel.component.html',
    styleUrls: ['./profile-panel.component.css']
})
export class ProfilePanelComponent implements OnInit {
    user: User;
    hideEditForm: boolean = true;
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.user = this.userService.currentUser;
    }

    onEditClick(): void {
        this.hideEditForm = !this.hideEditForm;
    }

    profileUpdateHandler({reason, data}: ChangeEvent<User>): void {
        const updatedUser = data;
        this.user = updatedUser;
        this.hideEditForm = true;
    }
}
