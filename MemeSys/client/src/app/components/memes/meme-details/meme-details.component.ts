import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    meme: Meme;
    memeSub: Subscription;
    commentSub: Subscription;
    isFormHidden: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private memeService: MemeService,
        private commentService: CommentService) { }

    ngOnInit(): void {
        
        const memeId = this.route.snapshot.paramMap.get('id');
        this.memeSub = this.memeService.getOneMemeById(memeId).subscribe(meme => this.meme = meme);
        this.commentSub = this.commentService.commentStateSource
            .subscribe(() => {
                this.memeSub.unsubscribe();
                this.memeSub = this.memeService.getOneMemeById(memeId).subscribe(meme => this.meme = meme);
            });
    }

    ngOnDestroy(): void {
        this.memeSub.unsubscribe();
        this.commentSub.unsubscribe();
    }

    showHideCommentForm(): void {
        this.isFormHidden = !this.isFormHidden;
    }
}
