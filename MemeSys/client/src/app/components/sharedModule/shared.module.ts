import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { CommentComponent } from './comment/comment.component';
import { LetDirective } from './directives/let.directive';
import { UrlShortenPipe } from './pipes/url-shorten.pipe';
import { SincePipe } from './pipes/since.pipe';


@NgModule({
    imports: [        
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [ModalComponent, CommentComponent, LetDirective, UrlShortenPipe, SincePipe],
    exports: [CommentComponent, LetDirective, UrlShortenPipe],
    entryComponents: [ModalComponent]
})
export class SharedModule { }
