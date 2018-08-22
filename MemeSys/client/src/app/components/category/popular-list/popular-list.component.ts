import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedDataService } from '../../shared/services/sharedData.service';


@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.css']
})
export class PopularListComponent implements OnInit {
    currentCategory$: Observable<string>;

    constructor(private dataService: SharedDataService) { }

    ngOnInit(): void {
        this.currentCategory$ = this.dataService.categoryChanges$;
    }

    onClick(catId: string): void {
        this.dataService.changeDisplayCategory(catId);
    }

}
