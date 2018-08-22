import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { StaticCustomValidators } from '../../shared/validators/static-custom.validators';
import { MemeService } from '../shared/services/meme.service';
import { Category } from '../../category/models/view-models/category.model';
import { UserService } from '../../shared/services/user.service';
import { SharedDataService } from '../../shared/services/sharedData.service';
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
        private router: Router) { }

    ngOnInit(): void {
        this.createMemeForm();
        this.categories$ = this.categoryService.getAllCategories();
    }

    ngOnDestroy(): void {
        if (this.createSub) {
            this.createSub.unsubscribe();
        }
    }

    createMemeForm(): void {
        this.memeForm = this.fb.group({
            creator: [''],
            title: ['', [
                Validators.required,
                Validators.minLength(5)]],
            image: ['', [
                Validators.required,
                StaticCustomValidators.customPattern(/[A-Za-z0-9]+\.jpg$|\.jpeg$|\.png$/, 'memtype')]],
            category: ['', [Validators.required]]
        });
        this.f.creator.setValue(this.userService.currentUser._id);
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