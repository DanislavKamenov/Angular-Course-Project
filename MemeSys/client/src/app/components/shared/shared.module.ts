import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { CommentComponent } from './comment/comment.component';
import { LetDirective } from './directives/let.directive';


@NgModule({
    imports: [        
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [ModalComponent, CommentComponent, LetDirective],
    exports: [CommentComponent, LetDirective],
    entryComponents: [ModalComponent]
})
export class SharedModule { }
