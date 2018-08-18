import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';

import { HelperService } from '../services/helper.service';
import { UserService } from '../services/user.service';
import { CommentService } from '../services/comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    @Input() comment: Comment;
    constructor(
        private userService: UserService,
        private helperService: HelperService,
        private commentService: CommentService) { }

    calcTime(dateToIsoFormat: Date): string {
        return this.helperService.calcTime(dateToIsoFormat);
    }

    canDelete(): boolean {
        const user = this.userService.user;
        console.log(user);
        return user && (user.isAdmin || user._id === this.comment.creator._id);
    }

    onDeleteClick() {
        this.commentService.deleteComment(this.comment._id).subscribe(() => this.commentService.emitChange());
    }
}
