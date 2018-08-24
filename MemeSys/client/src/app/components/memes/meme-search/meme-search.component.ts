import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Meme } from '../shared/models/view-models/meme.model';
import { MemeService } from '../shared/services/meme.service';
import { fadeAnimations } from '../../sharedModule/animations/fade.animations';
import { ChangeEvent } from '../../sharedModule/models/change-event.model';

@Component({
    selector: 'app-meme-search',
    templateUrl: './meme-search.component.html',
    styleUrls: ['./meme-search.component.css'],
    animations: fadeAnimations
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

    handleMemeUpdate(e: ChangeEvent<Meme>, searchParams: string): void {
        this.memes$ = this.memeService.searchMemes(searchParams);
    }
}
