import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { MemesModule } from '../memes/memes.module';

import { ProfilePanelComponent } from './profile-panel/profile-panel.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserMemesComponent } from './user-memes/user-memes.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NgbModule,
    MemesModule
  ],
  exports: [
      
  ],
  declarations: [ProfilePanelComponent, UserViewComponent, UserEditComponent, UserMemesComponent]
})
export class UserModule { }
