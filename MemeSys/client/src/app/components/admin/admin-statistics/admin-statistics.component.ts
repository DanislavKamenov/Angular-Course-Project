import { Component, OnInit } from '@angular/core';

import { Category } from '../../category/models/view-models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { Meme } from '../../memes/shared/models/view-models/meme.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin-statistics',
    templateUrl: './admin-statistics.component.html',
    styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(private catService: CategoryService) { }

    ngOnInit() {
        this.categories$ = this.catService.getAllCategoriesAndMemes();
    }
    
    calcTotalMemes(categories: Category[]): number {
        return categories.map(c => c.memes.length).reduce((a, b) => a+= b, 0);
    }

    calcCommentsInCategory(memes: Meme[]): number {
        return memes.map(m => m.comments.length).reduce((a, b) => a+= b, 0);
    }

    calcTotalComments(categories: Category[]): number {
        return categories.map(c => c.memes.map(m => m.comments.length).reduce((a, b) => a += b, 0)).reduce((a, b) => a+= b, 0);
    }
}
