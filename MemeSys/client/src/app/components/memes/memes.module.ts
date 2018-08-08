import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemeComponent } from './meme/meme.component';
import { MemesRoutingModule } from './memes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MemesRoutingModule
  ],
  declarations: [MemeComponent],
  exports: [MemeComponent]
})
export class MemesModule { }
