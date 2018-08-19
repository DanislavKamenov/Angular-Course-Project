import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedDataService } from '../../memes/shared/services/sharedData.service';


@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.css']
})
export class PopularListComponent implements OnInit {
    currentCategory$: Observable<string>;

    constructor(private dataService: SharedDataService) { }

    ngOnInit(): void {
        console.log('t1');
        this.currentCategory$ = this.dataService.memeSource;
    }

    onClick(catId: string): void {
        this.dataService.changeCategory(catId);
    }

}
