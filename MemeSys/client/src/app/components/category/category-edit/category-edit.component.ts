import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Category } from '../models/view-models/category.model';
import { CategoryService } from '../services/category.service';
import { SharedDataService } from '../../shared/services/sharedData.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
    categories: Category[];
    categoriesSub: Subscription;
    newCategorySub: Subscription;
    deleteSub: Subscription;

    constructor(
        private catService: CategoryService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.categoriesSub = this.catService
            .getAllCategories()
            .subscribe(categories => this.categories = categories);
        this.newCategorySub = this.dataService.newCategory$
            .subscribe((category) => {
                this.categories.push(category);
            });
    }

    ngOnDestroy(): void {
        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
        this.categoriesSub.unsubscribe();
        this.newCategorySub.unsubscribe();
    }

    onCategoryClick(catId: string): void {
        this.dataService.changeDisplayCategory(catId);
    }

    onDeleteClick(catId: string): void {
        this.deleteSub = this.catService.deleteCategory(catId).subscribe(() => {
            this.categories = this.categories.filter(c => c._id !== catId);
        });
    }
}
