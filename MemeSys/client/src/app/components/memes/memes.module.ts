import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MemeComponent } from './meme/meme.component';
import { MemesRoutingModule } from './memes-routing.module';
import { MemeListComponent } from './meme-list/meme-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MemePageComponent } from './meme-page/meme-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MemesRoutingModule
  ],
  declarations: [MemeComponent, MemeListComponent, CategoryListComponent, MemePageComponent],
  exports: [MemeComponent]
})
export class MemesModule { }
