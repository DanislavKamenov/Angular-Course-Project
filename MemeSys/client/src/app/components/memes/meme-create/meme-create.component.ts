import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CustomValidators } from '../../shared/validators/custom.validators';
import { MemeService } from '../shared/services/meme.service';
import { Category } from '../../category/models/view-models/category.model';
import { UserService } from '../../shared/services/user.service';
import { SharedDataService } from '../shared/services/sharedData.service';
import { CategoryService } from '../../category/services/category.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './meme-create.component.html',
    styleUrls: ['./meme-create.component.css']
})
export class MemeCreateComponent implements OnInit, OnDestroy {
    memeForm: FormGroup;
    categories$: Observable<Category[]>;
    createSub: Subscription
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private memeService: MemeService,
        private categoryService: CategoryService,
        private dataService: SharedDataService,
        private router: Router) {
        this.memeForm = this.fb.group({
            creator: [userService.user._id],
            title: ['', [
                Validators.required,
                Validators.minLength(5)]],
            image: ['', [
                Validators.required,
                CustomValidators.customPattern(/\.jpg$|\.jpeg$|\.png$/, 'memtype')]],
            category: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        this.categories$ = this.categoryService.getAllCategories();
    }

    ngOnDestroy(): void {
        if (this.createSub) {
            this.createSub.unsubscribe();
        }
    }

    onSubmit(): void {
        if (this.memeForm.valid) {
            this.createSub = this.memeService.createMeme(this.memeForm.value)
                .subscribe(() => {
                    this.dataService.changeDisplayCategory(this.f.category.value);
                    this.router.navigate(['/memes']);
                });
        }
    }

    get f() { return this.memeForm.controls; }
}