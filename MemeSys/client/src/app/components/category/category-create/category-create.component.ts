import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StaticCustomValidators } from '../../shared/validators/static-custom.validators';
import { SharedDataService } from '../../shared/services/sharedData.service';
import { CategoryService } from '../services/category.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
    categoryForm: FormGroup;
    createSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private categoryService: CategoryService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.createCategoryForm();
    }

    ngOnDestroy(): void {
        if (this.createSub) {
            this.createSub.unsubscribe();
        }
    }

    createCategoryForm(): void {
        this.categoryForm = this.fb.group({
            creator: [''],
            name: ['', [
                Validators.required,
                Validators.minLength(5)]],
            icon: ['', [
                Validators.required,
                StaticCustomValidators.customPattern(/[A-Za-z0-9]+\.jpg$|\.jpeg$|\.png$/, 'memtype')]]
        });
        this.f.creator.setValue(this.userService.currentUser._id);
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