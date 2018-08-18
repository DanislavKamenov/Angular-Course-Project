import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';
import { MemesRoutingModule } from './memes-routing.module';

import { MemeComponent } from './meme/meme.component';
import { MemeListComponent } from './meme-list/meme-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MemePageComponent } from './meme-page/meme-page.component';
import { MemeDetailsComponent } from './meme-details/meme-details.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        SharedModule,
        MemesRoutingModule
    ],
    declarations: [
        MemeComponent,
        MemeListComponent,
        CategoryListComponent,
        MemePageComponent,
        MemeDetailsComponent,
        CommentFormComponent]
})
export class MemesModule { }
