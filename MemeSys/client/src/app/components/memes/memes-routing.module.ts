import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemePageComponent } from './meme-page/meme-page.component';
import { MemeDetailsComponent } from './meme-details/meme-details.component';
import { MemeListComponent } from './meme-list/meme-list.component';
import { AuthGuard } from '../authentication/shared/guards/auth.guard';
import { MemeCreateComponent } from './meme-create/meme-create.component';
import { MemeSearchComponent } from './meme-search/meme-search.component';

const memeRoutes: Routes = [
    {
        path: '', component: MemePageComponent, children: [
            { path: '', component: MemeListComponent }
        ]
    },
    { path: 'meme/:id', canActivate: [AuthGuard], component: MemeDetailsComponent },
    { path: 'search', canActivate: [AuthGuard], component: MemeSearchComponent },
    { path: 'create', canActivate: [AuthGuard], component: MemeCreateComponent }

]

@NgModule({
    imports: [
        RouterModule.forChild(memeRoutes)
    ],
    exports: [RouterModule]
})
export class MemesRoutingModule { }
