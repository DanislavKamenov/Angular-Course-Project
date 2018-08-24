import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ServerResponse } from '../models/server-response.model';
import { Comment } from '../models/comment.model';
import { UserService } from './user.service';

const root: string = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CommentService implements OnDestroy {
    private commentUrl: string = root + 'comment/';    
    private commentStateSource = new Subject<boolean>();
    commentChanges$: Observable<boolean>;

    constructor(
        private http: HttpClient,
        private userService: UserService) {
            this.commentChanges$ = this.commentStateSource.asObservable();
         }

    
    ngOnDestroy(): void {
        this.commentStateSource.unsubscribe();
    }

    createComment(content: {[key: string]: string}, query: {[key: string]: string}): Observable<Comment> {
        const commentToSend = {
            creator: this.userService.currentUser._id,
            content,
            query
        }
        return this.http
            .post<ServerResponse<Comment>>(this.commentUrl, commentToSend)
            .pipe(
                map(res => res.data.comment)
            );
    }

    deleteComment(commentId: string):Observable<Comment> {
        const deleteUrl = this.commentUrl + commentId;

        return this.http
            .delete<ServerResponse<Comment>>(deleteUrl)
            .pipe(
                map(res => res.data.comment)
            );
    }

    emitChange(): void {
        return this.commentStateSource.next(true);
    }
}