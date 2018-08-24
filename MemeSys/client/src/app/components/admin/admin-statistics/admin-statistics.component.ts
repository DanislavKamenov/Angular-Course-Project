import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../category/models/view-models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { Meme } from '../../memes/shared/models/view-models/meme.model';
import { StatisticService } from '../shared/services/statistic.service';

@Component({
    selector: 'app-admin-statistics',
    templateUrl: './admin-statistics.component.html',
    styleUrls: ['./admin-statistics.component.css']
})
export class AdminStatisticsComponent implements OnInit {
    categories$: Observable<Category[]>;

    constructor(
        private catService: CategoryService,
        private statisticService: StatisticService) { }

    ngOnInit() {
        this.categories$ = this.catService.getAllCategoriesAndMemes();
    }
    
    calcTotalMemes(categories: Category[]): number {
        return this.statisticService.calcTotalMemes(categories);
    }

    calcCommentsInCategory(memes: Meme[]): number {
        return this.statisticService.calcCommentsInCategory(memes);
    }

    calcTotalComments(categories: Category[]): number {
        return this.statisticService.calcTotalComments(categories);
    }
}
