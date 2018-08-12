import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

import { MemeService } from "./meme.service";
import { Meme } from "../models/meme.model";

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    memeSource$ = new Subject<Observable<Meme[]>>();

    constructor(private memeService: MemeService) { }

    changeCategory(catId) {
        return this.memeSource$.next(this.memeService.getMemesByCategory(catId));
    }
}