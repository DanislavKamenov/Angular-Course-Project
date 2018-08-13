import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
    imports: [        
        CommonModule,
        RouterModule,
        NgbModule.forRoot()
    ],
    declarations: [ModalComponent, CommentComponent],
    exports: [CommentComponent],
    entryComponents: [ModalComponent]
})
export class SharedModule { }
