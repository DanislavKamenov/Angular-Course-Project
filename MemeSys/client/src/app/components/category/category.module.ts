import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { PopularListComponent } from './popular-list/popular-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule
  ],
  declarations: [
      CategoryListComponent, 
      PopularListComponent, 
      CategoryMenuComponent, 
      CategoryCreateComponent, CategoryManageComponent
    ],
  exports: [CategoryListComponent, CategoryMenuComponent, CategoryCreateComponent, CategoryManageComponent]
})
export class CategoryModule { }
