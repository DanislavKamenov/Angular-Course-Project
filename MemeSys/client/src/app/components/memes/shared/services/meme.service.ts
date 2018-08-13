import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, share } from 'rxjs/operators';

import { Meme } from '../models/meme.model';
import { ServerResponse } from '../../../shared/models/server-response.model';
import { UserService } from '../../../shared/services/user.service';

const root: string = '/api/';

@Injectable({
    providedIn: 'root'
})
export class MemeService {
    private allMemesUrl: string = root + 'meme/';
    private voteUrl: string = this.allMemesUrl + 'vote';

    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    getAllMemes(): Observable<Meme[]> {
        return this.http
            .get<ServerResponse<Meme[]>>(this.allMemesUrl)
            .pipe(
                catchError(this.handleError<Meme[]>([])),
                map(res => res.data.memes),
                share()
            );
    }

    getMemesByCategory(catId: string): Observable<Meme[]> {
        const query = `?filter[category]=${catId}`;

        return this.http
            .get<ServerResponse<Meme[]>>(this.allMemesUrl + query)
            .pipe(
                catchError(this.handleError<Meme[]>([])),
                map(res => res.data.memes)
            );
    }

    getOneMemeById(memeId: string): Observable<Meme> {
        const oneMemeUrl = this.allMemesUrl + memeId;
        return this.http
            .get<ServerResponse<Meme>>(oneMemeUrl)
            .pipe(
                catchError(this.handleError<Meme>()),
                map(res => res.data.meme)
            );
        }

    vote(memeId: string, type: string): Observable<Meme> {
        const userId = this.userService.user._id;
        console.log(userId);

        return this.http
            .post<ServerResponse<Meme>>(this.voteUrl, { memeId, type, userId })
            .pipe(
                catchError(this.handleError<Meme>()),
                map(res => res.data.meme)
            );
    }    

    hasUserUpVoted(meme: Meme): boolean {
        const userId = this.userService.user._id;
        return meme.upVoted.includes(userId);
    }

    hasUserDownVoted(meme: Meme): boolean {
        const userId = this.userService.user._id;
        return meme.downVoted.includes(userId);
    }

    private handleError<T>(result?: T) {
        return (res: HttpErrorResponse) => {
            console.log(res);

            const response: ServerResponse<T> = {
                success: true,
                statusCode: 200,
                data: { memes: result }
            }
            return of(response);
        }
    }
}