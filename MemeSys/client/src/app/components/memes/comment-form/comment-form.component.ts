import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SharedDataService } from '../shared/services/sharedData.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { CommentService } from '../../shared/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnDestroy, OnChanges {
    @Input() isFormHidden: boolean;
    commentForm: FormGroup;
    createSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private commentService: CommentService
        ) {
        this.commentForm = this.fb.group({
            content: ['', [
                Validators.required
            ]]
        });
    }

    ngOnChanges(): void {
        this.commentForm.reset();
    }

    ngOnDestroy(): void {
        if(this.createSub) {
            this.createSub.unsubscribe();
        }
    } 

    onSubmit(): void {
        if (this.commentForm.valid) {
            const memeId = this.route.snapshot.paramMap.get('id');
            this.createSub = this.commentService
                .createComment(this.commentForm.value.content, {id: memeId})
                .subscribe(() => this.commentService.emitChange());
            this.commentForm.reset();
        }
    }

    get f() { return this.commentForm.controls; }
}
