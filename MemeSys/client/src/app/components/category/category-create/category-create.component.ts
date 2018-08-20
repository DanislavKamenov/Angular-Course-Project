import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CustomValidators } from '../../shared/validators/custom.validators';
import { UserService } from '../../shared/services/user.service';
import { SharedDataService } from '../../memes/shared/services/sharedData.service';
import { CategoryService } from '../services/category.service';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnDestroy {
    categoryForm: FormGroup;
    createSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private categoryService: CategoryService,
        private dataService: SharedDataService) {
        this.categoryForm = this.fb.group({
            creator: [userService.user._id],
            name: ['', [
                Validators.required,
                Validators.minLength(5)]],
            icon: ['', [
                Validators.required,
                CustomValidators.customPattern(/\.jpg$|\.jpeg$|\.png$/, 'memtype')]]
        })
    }

    ngOnDestroy(): void {
        if (this.createSub) {
            this.createSub.unsubscribe();
        }
    }

    onSubmit(): void {
        if (this.categoryForm.valid) {
            this.createSub = this.categoryService.createCategory(this.categoryForm.value)
                .subscribe((category) => {
                    this.categoryForm.reset();
                    this.dataService.addNewCategory(category);
                });
        }
    }

    get f() { return this.categoryForm.controls; }
}