import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';
import { MemesRoutingModule } from './memes-routing.module';

import { MemeComponent } from './meme/meme.component';
import { MemeListComponent } from './meme-list/meme-list.component';
import { MemePageComponent } from './meme-page/meme-page.component';
import { MemeDetailsComponent } from './meme-details/meme-details.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { MemeCreateComponent } from './meme-create/meme-create.component';
import { CategoryModule } from '../category/category.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        SharedModule,
        CategoryModule,
        MemesRoutingModule
    ],
    declarations: [
        MemeComponent,
        MemeListComponent,
        MemePageComponent,
        MemeDetailsComponent,
        CommentCreateComponent,
        MemeCreateComponent]
})
export class MemesModule { }
