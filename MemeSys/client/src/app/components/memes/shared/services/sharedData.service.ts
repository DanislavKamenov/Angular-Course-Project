import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    memeSource = new BehaviorSubject<string>('hot');

    constructor() { }

    changeCategory(catId: string): void {
        return this.memeSource.next(catId);
    }    
}