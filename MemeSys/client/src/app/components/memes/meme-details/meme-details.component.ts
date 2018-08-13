import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Meme } from '../shared/models/meme.model';
import { MemeService } from '../shared/services/meme.service';
import { CommentService } from '../../shared/services/comment.service';

@Component({
    selector: 'app-meme-details',
    templateUrl: './meme-details.component.html',
    styleUrls: ['./meme-details.component.css']
})
export class MemeDetailsComponent implements OnInit {
    meme$: Observable<Meme>;
    commentSub: Subscription;
    isFormHidden: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private memeService: MemeService,
        private commentService: CommentService) { }

    ngOnInit(): void {
        const memeId = this.route.snapshot.paramMap.get('id');

        this.meme$ = this.memeService.getOneMemeById(memeId);
        this.commentSub = this.commentService.commentStateSource
            .subscribe(() => this.meme$ = this.memeService.getOneMemeById(memeId));
    }

    ngOnDestroy(): void {
        this.commentSub.unsubscribe();
    }

    showHideCommentForm(): void {
        this.isFormHidden = !this.isFormHidden;
    }
}
