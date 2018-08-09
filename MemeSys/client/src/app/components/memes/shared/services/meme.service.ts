import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Meme } from '../models/meme.model';
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
            .get<ServerResponse<Meme[]>>(this.allUrl)
            .pipe(
                map(res => res.data.memes)
            );
    }
}