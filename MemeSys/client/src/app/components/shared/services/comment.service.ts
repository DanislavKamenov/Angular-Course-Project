import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { ServerResponse } from '../models/server-response.model';
import { Comment } from '../models/comment.model';
import { UserService } from './user.service';

const root: string = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private commentUrl: string = root + 'comment/';
    
    commentStateSource = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private userService: UserService) { }

    createComment(content: {[key: string]: string}, query: {[key: string]: string}): Observable<Comment> {
        const commentToSend = {
            creator: this.userService.user._id,
            content,
            query
        }
        return this.http
            .post<ServerResponse<Comment>>(this.commentUrl, commentToSend)
            .pipe(
                catchError(this.handleError<Comment>()),
                map(res => res.data.comment)
            );
    }

    deleteComment(commentId: string):Observable<Comment> {
        const deleteUrl = this.commentUrl + commentId;

        return this.http
            .delete<ServerResponse<Comment>>(deleteUrl)
            .pipe(
                catchError(this.handleError<Comment>()),
                map(res => res.data.comment)
            );
    }

    emitChange(): void {
        return this.commentStateSource.next(true);
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