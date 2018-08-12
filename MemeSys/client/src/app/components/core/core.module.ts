import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ModalComponent } from './modal/modal.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem('token'),
                whitelistedDomains: ['localhost:4200']
            }
        })
    ],
    declarations: [NavigationComponent, FooterComponent, ModalComponent],
    exports: [NavigationComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SuccessInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    entryComponents: [ModalComponent]
})
export class CoreModule { }
