import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Meme } from '../models/meme.model';
import { ServerResponse } from '../../../shared/models/server-response.model';
import { UserService } from '../../../shared/services/user.service';

const root: string = '/api/';

@Injectable({
    providedIn: 'root'
})
export class MemeService {
    private allMemesUrl: string = `${root}meme/`;
    private voteUrl: string = `${this.allMemesUrl}vote/`;
    private freshUrl: string = `${this.allMemesUrl}fresh/`;

    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    getMemesByCriteria(criteria: string, skip: number, limit: number) {
        switch  (criteria) {
            case 'hot':
                return this.getMemesByVotes(-1, skip, limit);
            case 'fresh':
                return this.getFreshMemes(1, skip, limit);
            default:
                return this.getMemesByCategory(criteria, skip, limit);
        }
    }

    getAllMemes(skip: number, limit: number): Observable<Meme[]> {
        const query = `?[skip]=${skip}&[limit]=${limit}`;

        return this.getMemesRequest(this.allMemesUrl + query);
    }

    getMemesByVotes(sort: number, skip: number, limit: number): Observable<Meme[]> {
        const getByVotesUrl = `${this.voteUrl}${sort}/${skip}/${limit}`;

        return this.getMemesRequest(getByVotesUrl);
    }

    getFreshMemes(sort: number, skip: number, limit: number): Observable<Meme[]> {
        const getCreationDateUrl = `${this.freshUrl}${sort}/${skip}/${limit}`;

        return this.getMemesRequest(getCreationDateUrl);
    }

    getMemesByCategory(catId: string, skip: number, limit: number): Observable<Meme[]> {
        const query = `?filter[category]=${catId}&[skip]=${skip}&[limit]=${limit}`;

        return this.getMemesRequest(this.allMemesUrl + query);
    }

    getOneMemeById(memeId: string): Observable<Meme> {
        const oneMemeUrl = this.allMemesUrl + memeId;
        return this.getMemeRequest(oneMemeUrl);
    }

    deleteMeme(memeId: string): Observable<Meme> {
        const oneMemeUrl = this.allMemesUrl + memeId;
        return this.deleteMemeRequest(oneMemeUrl);
    }

    vote(memeId: string, type: string): Observable<Meme> {
        const userId = this.userService.user._id;

        return this.postMemeRequest(this.voteUrl, { memeId, type, userId });
    }

    hasUserUpVoted(meme: Meme): boolean {
        const userId = this.userService.user._id;
        return meme.upVoted.includes(userId);
    }

    hasUserDownVoted(meme: Meme): boolean {
        const userId = this.userService.user._id;
        return meme.downVoted.includes(userId);
    }

    private getMemesRequest(url: string): Observable<Meme[]> {
        return this.http
        .get<ServerResponse<Meme[]>>(url)
        .pipe(
            catchError(this.handleError<Meme[]>([])),
            map(res => res.data.memes)
        );
    }

    private getMemeRequest(url: string): Observable<Meme> {
        return this.http
        .get<ServerResponse<Meme>>(url)
        .pipe(
            catchError(this.handleError<Meme>()),
            map(res => res.data.meme)
        );
    }

    private postMemeRequest(url: string, data: any): Observable<Meme> {
        return this.http
        .post<ServerResponse<Meme>>(url, data)
            .pipe(
                catchError(this.handleError<Meme>()),
                map(res => res.data.meme)
            );
    }

    private deleteMemeRequest(url: string): Observable<Meme> {
        return this.http
            .delete<ServerResponse<Meme>>(url)
            .pipe(
                catchError(this.handleError<Meme>()),
                map(res => res.data.meme)
            );
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