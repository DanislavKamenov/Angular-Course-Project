import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { UserMemesComponent } from './user-memes/user-memes.component';

const userRoutes: Routes = [
    { path: 'profile', component: ProfilePanelComponent },
    { path: 'memes',  component: UserMemesComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }
