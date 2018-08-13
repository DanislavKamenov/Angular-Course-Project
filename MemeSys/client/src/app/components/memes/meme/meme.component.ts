import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Meme } from '../shared/models/meme.model';
import { MemeService } from '../shared/services/meme.service';
import { UserService } from '../../shared/services/user.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-meme',
    templateUrl: './meme.component.html',
    styleUrls: ['./meme.component.css'],
})
export class MemeComponent implements OnDestroy {
    @Input() meme: Meme;
    voteSub$: Subscription;

    constructor(
        private memeService: MemeService,
        private userService: UserService,
        private modalService: ModalService) { }

    ngOnDestroy() {
        if (this.voteSub$) {
            this.voteSub$.unsubscribe();
        }
    }

    voteClickHandler(memeId: string, type: string): void {
        if (this.userService.isLoggedIn()) {
            this.vote(memeId, type);
        } else {
            console.log(this.modalService);
            const title = 'WARNING';
            const message = 'You must login in in order to vote.';
            const redirectUrl = '/auth/login';
            this.modalService.createRedirectModal(title, message, redirectUrl);
        }
    }    

    vote(memeId: string, type: string): void {
        this.voteSub$ = this.memeService.vote(memeId, type).subscribe(meme => {
            console.log(meme.votes);
            this.meme = meme;
        });
    }

    hasUserUpVoted(meme: Meme): boolean {
        //TODO: Improve this check
        if (this.userService.isLoggedIn()) {
            return this.memeService.hasUserUpVoted(meme);
        } else {
            false;
        }
    }

    hasUserDownVoted(meme: Meme): boolean {
        if (this.userService.isLoggedIn()) {
            return this.memeService.hasUserDownVoted(meme);
        } else {
            false;
        }
    }
}
