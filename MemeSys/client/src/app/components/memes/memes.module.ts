import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeComponent } from './meme/meme.component';
import { MemesRoutingModule } from './memes-routing.module';
import { MemeListComponent } from './meme-list/meme-list.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [
    CommonModule,
    MemesRoutingModule
  ],
  declarations: [MemeComponent, MemeListComponent, CategoryListComponent],
  exports: [MemeComponent]
})
export class MemesModule { }
