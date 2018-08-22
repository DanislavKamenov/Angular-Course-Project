import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryModule } from '../category/category.module';
import { RouterModule } from '@angular/router';
import { AdminPanelNavComponent } from './admin-panel-nav/admin-panel-nav.component';
import { AdminCategoryManageComponent } from './admin-category-manage/admin-category-manage.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';
import { AdminUserManageComponent } from './admin-user-manage/admin-user-manage.component';
import { UserManageRowComponent } from './user-manage-row/user-manage-row.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        RouterModule,
        CategoryModule,
        NgbModule
    ],
    exports: [CategoryModule],
    declarations: [
        AdminPanelComponent,
        AdminPanelNavComponent,
        AdminCategoryManageComponent,
        AdminStatisticsComponent,
        UserManageRowComponent,
        AdminUserManageComponent]
})
export class AdminModule { }
