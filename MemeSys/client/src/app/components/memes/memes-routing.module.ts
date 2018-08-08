import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MemeComponent } from './meme/meme.component';

const memeRoutes: Routes = [
    { path: 'meme', component: MemeComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(memeRoutes)
    ],
    declarations: []
})
export class MemesRoutingModule { }
