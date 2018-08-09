import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryService } from './services/category-service';
import { Category } from '../shared/models/category.model';

@Component({
    selector: 'app-group-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private catService: CategoryService) { }

    ngOnInit(): void {
        this.categories$ = this.catService.getAllCategories();
    }

    onClick(name): void {
        console.log(name);
    }

}
