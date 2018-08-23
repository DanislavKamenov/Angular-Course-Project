import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../authentication/shared/guards/auth.guard';
import { ProfilePanelComponent } from './profile-panel/profile-panel.component';

const userRoutes: Routes = [
    { path: 'profile', canActivate: [AuthGuard], component: ProfilePanelComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule { }
