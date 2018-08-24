import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Meme } from '../shared/models/view-models/meme.model';
import { MemeService } from '../shared/services/meme.service';

@Component({
    selector: 'app-meme-search',
    templateUrl: './meme-search.component.html',
    styleUrls: ['./meme-search.component.css']
})
export class MemeSearchComponent implements OnInit, OnDestroy {
    memes$: Observable<Meme[]>;
    searchParams = new Subject<string>();
    constructor(private memeService: MemeService) { }

    ngOnInit(): void {
        this.memes$ = this.searchParams.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(value => this.memeService.searchMemes(value))
        )
    }

    ngOnDestroy(): void {
        this.searchParams.unsubscribe();
    }

    search(value: string): void {
        this.searchParams.next(value);
    }    
}
