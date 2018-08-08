import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meme } from '../models/meme.model';
import { map, tap } from '../../../../../../node_modules/rxjs/operators';
import { ServerResponse } from '../../../core/models/server-response.model';


const root: string = '/api/';

@Injectable({
    providedIn: 'root'
})
export class MemeService {
    private allUrl: string = root + 'meme';

    constructor(private http: HttpClient) { }

    getAllMemes(): Observable<Meme[]> {
        return this.http
            .get<ServerResponse>(this.allUrl)
            .pipe<Meme[]>(
                map(res => res.data.memes),
                tap(console.log)
            )
    }
}