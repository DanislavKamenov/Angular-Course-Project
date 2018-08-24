import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MemeService } from '../shared/services/meme.service';
import { SharedDataService } from '../../shared/services/sharedData.service';
import { Meme } from '../shared/models/view-models/meme.model';
import { ChangeEvent } from '../../shared/models/change-event.model';

@Component({
    selector: 'app-meme-list',
    templateUrl: './meme-list.component.html',
    styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit, OnDestroy {
    private _category: string;
    memes: Meme[];
    skipCount: number = 0;
    limitCount: number = 3;
    memesSub: Subscription;
    categoryChanges: Subscription;

    constructor(
        private memeSerivce: MemeService,
        private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.categoryChanges = this.dataService.categoryChanges$
            .subscribe(category => this.category = category);
    }

    ngOnDestroy(): void {
        this.memesSub.unsubscribe();
        this.categoryChanges.unsubscribe();
    }

    onScrollDown(): void {
        this.skipCount++;
        this.memesSub.unsubscribe();

        this.memesSub = this.memeSerivce.getMemesByCriteria(this.category, this.skipCount, this.limitCount)
            .subscribe(memes => this.memes = [...this.memes, ...memes]);
    }

    HandleMemeUpdate(event: ChangeEvent<Meme>): void {
        this.memesSub.unsubscribe();
        this.memesSub = this.memeSerivce
            .getMemesByCriteria(this.category, 0, this.memes.length)
            .subscribe(memes => this.memes = memes);
    }

    get category() {
        return this._category;
    }

    set category(id: string) {
        if (this.memesSub) {
            this.memesSub.unsubscribe();
        }

        this.skipCount = 0;
        this.memesSub = this.memeSerivce.getMemesByCriteria(id, this.skipCount, this.limitCount)
            .subscribe(memes => this.memes = memes);
        this._category = id;
    };
}
