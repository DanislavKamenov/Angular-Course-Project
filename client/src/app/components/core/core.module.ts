import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    declarations: [NavigationComponent, FooterComponent, NotificationComponent],
    exports: [NavigationComponent, FooterComponent, NotificationComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
          }
    ]
})
export class CoreModule { }
