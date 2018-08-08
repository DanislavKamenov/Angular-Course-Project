import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MemeService } from '../shared/services/meme.service';
import { Meme } from '../shared/models/meme.model';

@Component({
    selector: 'app-meme-list',
    templateUrl: './meme-list.component.html',
    styleUrls: ['./meme-list.component.css']
})
export class MemeListComponent implements OnInit {
    memes$: Observable<Meme[]>;

    constructor(private memeService: MemeService) { }

    ngOnInit(): void {
        this.getAllMemes();
    }

    getAllMemes(): void {
        this.memes$ = this.memeService.getAllMemes();
    }

}
