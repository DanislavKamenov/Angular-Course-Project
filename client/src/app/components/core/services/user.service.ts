import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class UserService {

  constructor() { 
      console.log('new userService instance');
  }
  
}
