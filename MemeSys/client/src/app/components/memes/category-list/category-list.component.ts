import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../shared/services/category.service';
import { SharedDataService } from '../shared/services/sharedData.service';
import { Category } from '../shared/models/category.model';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(
        private catService: CategoryService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.categories$ = this.catService.getAllCategories();
    }

    onClick(catId: string): void {
        this.dataService.changeCategory(catId);
    }

}
