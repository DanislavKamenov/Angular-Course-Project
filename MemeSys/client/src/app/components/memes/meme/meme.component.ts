import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Meme } from '../shared/models/view-models/meme.model';
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
    voteSub: Subscription;
    deleteSub: Subscription;

    constructor(
        private memeService: MemeService,
        private userService: UserService,
        private modalService: ModalService,
        private router: Router) { }

    ngOnDestroy(): void {
        if (this.voteSub) {
            this.voteSub.unsubscribe();
        }

        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
    }

    onDeleteClick(memeId: string):void {
        this.deleteSub = this.memeService.deleteMeme(memeId).subscribe(() => this.router.navigate(['/memes']));
    }

    voteClickHandler(memeId: string, type: string): void {
        if (this.userService.isLoggedIn()) {
            this.vote(memeId, type);
        } else {
            const message = 'You must login in in order to vote.';
            this.modalService.createLoginRedirectModal(message);
        }
    }    

    vote(memeId: string, type: string): void {
        this.voteSub = this.memeService.vote(memeId, type).subscribe(meme => {
            this.meme = meme;
        });
    }

    hasUserUpVoted(meme: Meme): boolean {
        //TODO: Improve this check
        if (this.userService.isLoggedIn()) {
            return this.memeService.hasUserUpVoted(meme);
        }

        return false;
    }

    hasUserDownVoted(meme: Meme): boolean {
        if (this.userService.isLoggedIn()) {
            return this.memeService.hasUserDownVoted(meme);
        } else {
            false;
        }
    }

    isUserAdmin(): boolean {
        const user = this.userService.user;
        return user && user.isAdmin;
    }
}
