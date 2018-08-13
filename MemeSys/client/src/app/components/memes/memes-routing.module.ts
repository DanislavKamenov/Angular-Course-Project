import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MemePageComponent } from './meme-page/meme-page.component';
import { MemeDetailsComponent } from './meme-details/meme-details.component';
import { MemeListComponent } from './meme-list/meme-list.component';

const memeRoutes: Routes = [
    {
        path: '', component: MemePageComponent, children: [
            { path: 'meme/:id', component: MemeDetailsComponent },
            { path: '', component: MemeListComponent }
        ]
    },

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(memeRoutes)
    ],
    exports: [RouterModule]
})
export class MemesRoutingModule { }
