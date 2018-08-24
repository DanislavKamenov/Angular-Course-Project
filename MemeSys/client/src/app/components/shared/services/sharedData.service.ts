import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Category } from '../../category/models/view-models/category.model';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService implements OnDestroy {
    private categoryChangesSource: BehaviorSubject<string>;
    private categorySource: Subject<Category>;
    categoryChanges$: Observable<string>;
    newCategory$: Observable<Category>;
    oldCategory: string;
    currentCategory: string;

    constructor() { 
        this.categoryChangesSource = new BehaviorSubject<string>('hot');
        this.categorySource = new Subject<Category>();
        this.categoryChanges$ = this.categoryChangesSource.asObservable();
        this.newCategory$ = this.categorySource.asObservable();
    }

    ngOnDestroy(): void {
        this.categoryChangesSource.unsubscribe();
        this.categorySource.unsubscribe();
    }

    changeDisplayCategory(catId: string): void {
        this.oldCategory = this.currentCategory;
        this.currentCategory = catId;
        return this.categoryChangesSource.next(catId);
    }

    addNewCategory(category: Category): void {
        return this.categorySource.next(category);
    }

    backToPreviousCategory(): void {
        this.currentCategory = this.oldCategory;
        return this.categoryChangesSource.next(this.oldCategory);
    }
}