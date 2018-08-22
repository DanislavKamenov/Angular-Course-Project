import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Category } from '../../category/models/view-models/category.model';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    private categoryChangesSource: BehaviorSubject<string>;
    private categorySource: Subject<Category>;
    categoryChanges$: Observable<string>;
    newCategory$: Observable<Category>;


    constructor() { 
        this.categoryChangesSource = new BehaviorSubject<string>('hot');
        this.categorySource = new Subject<Category>();
        this.categoryChanges$ = this.categoryChangesSource.asObservable();
        this.newCategory$ = this.categorySource.asObservable();
    }

    changeDisplayCategory(catId: string): void {
        return this.categoryChangesSource.next(catId);
    }

    addNewCategory(category: Category): void {
        return this.categorySource.next(category);
    }
}