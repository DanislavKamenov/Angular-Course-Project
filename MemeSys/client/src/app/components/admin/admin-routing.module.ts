import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from '../authentication/shared/guards/admin.guard';

const adminRoutes: Routes = [
    { path: 'panel', component: AdminPanelComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
