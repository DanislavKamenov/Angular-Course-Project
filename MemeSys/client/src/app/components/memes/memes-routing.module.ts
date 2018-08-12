import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MemePageComponent } from './meme-page/meme-page.component';

const memeRoutes: Routes = [
    { path: 'meme', component: MemePageComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(memeRoutes)
    ],
    declarations: []
})
export class MemesRoutingModule { }
