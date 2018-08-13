import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,        
        CoreModule,
        SharedModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }