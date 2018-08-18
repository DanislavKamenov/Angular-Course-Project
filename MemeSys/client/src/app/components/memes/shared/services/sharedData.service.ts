import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Meme } from '../models/meme.model';
import { MemeService } from './meme.service';

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