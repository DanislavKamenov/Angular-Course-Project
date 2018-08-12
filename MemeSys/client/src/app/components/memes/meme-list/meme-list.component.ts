import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MemeService } from '../shared/services/meme.service';
import { SharedDataService } from '../shared/services/sharedData.service';
import { Meme } from '../shared/models/meme.model';

@Component({
    selector: 'app-meme-list',
    templateUrl: './meme-list.component.html',
    styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit, OnDestroy {
    memes$: Observable<Meme[]>;
    memeChanges$: Subscription;

    constructor(
        private memeService: MemeService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.memes$ = this.memeService.getAllMemes();
        this.memeChanges$ = this.dataService.memeSource$.subscribe(memes$ => this.memes$ = memes$);
    }

    ngOnDestroy(): void {
        this.memeChanges$.unsubscribe();
    }
}
