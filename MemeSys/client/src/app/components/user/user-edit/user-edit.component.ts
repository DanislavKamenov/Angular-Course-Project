import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../shared/models/user.model';
import { StaticCustomValidators } from '../../shared/validators/static-custom.validators';
import { UserService } from '../../shared/services/user.service';
import { ChangeEvent } from '../../shared/models/change-event.model';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    @Input() user: User;
    @Output('update') event = new EventEmitter<ChangeEvent<User>>();
    userEditForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private userService: UserService) { }

    ngOnInit(): void {
        this.createUserEditForm();
    }

    createUserEditForm(): void {
        this.userEditForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я]+')]],
            avatar: ['', [Validators.required, StaticCustomValidators.customPattern(/[A-Za-z0-9]+\.jpg$|\.jpeg$|\.png$/, 'memtype')]]
        });
        this.f.email.setValue(this.user.email);
        this.f.name.setValue(this.user.name);
        this.f.avatar.setValue(this.user.avatar);
    }

    onSubmit() {
        if (this.userEditForm.valid) {
            this.userService
                .editUser(this.user._id, this.userEditForm.value)
                .subscribe(updatedUser => this.event.emit({reason: 'edit', data: updatedUser}));
        }
    }

    get f() { return this.userEditForm.controls; }
}
