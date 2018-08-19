import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from '../services/category.service';
import { SharedDataService } from '../../memes/shared/services/sharedData.service';
import { Category } from '../models/view-models/category.model';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    categories$: Observable<Category[]>;
    currentCategory$: Observable<string>;
    cat: string;

    constructor(
        private catService: CategoryService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        console.log('t2');
        this.categories$ = this.catService.getAllCategories();
        this.currentCategory$ = this.dataService.memeSource;
    }

    onClick(catId: string): void {
        this.dataService.changeCategory(catId);
    }
}
