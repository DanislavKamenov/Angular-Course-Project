import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CategoryModule } from '../category/category.module';
import { RouterModule } from '../../../../node_modules/@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    CategoryModule
  ],
  exports: [CategoryModule],
  declarations: [AdminPanelComponent]
})
export class AdminModule { }
