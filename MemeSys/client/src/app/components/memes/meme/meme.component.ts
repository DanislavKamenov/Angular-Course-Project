import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { Meme } from '../shared/models/view-models/meme.model';
import { MemeService } from '../shared/services/meme.service';
import { UserService } from '../../sharedModule/services/user.service';
import { ModalService } from '../../sharedModule/services/modal.service';
import { ChangeEvent } from '../../sharedModule/models/change-event.model';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
    selector: 'app-meme',
    templateUrl: './meme.component.html',
    styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnDestroy {
    @Input() meme: Meme;
    @Output('memeUpdate') memeChange = new EventEmitter<ChangeEvent<Meme>>();
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
        this.deleteSub = this.memeService
            .deleteMeme(memeId)
            .subscribe((meme) =>  {
                this.memeChange.emit({reason: 'delete', data: meme})
                this.router.navigate(['/memes/']);
            });
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
            this.memeChange.emit({reason: 'vote', data: meme});
        });
    }

    hasUserUpVoted(meme: Meme): boolean {
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

    canDelete(): boolean {
        const user = this.userService.currentUser;
        return user && (user.isAdmin || user._id === this.meme.creator);
    }

    isUserAdmin(): boolean {
        const user = this.userService.currentUser;
        return user && user.isAdmin;
    }
}
