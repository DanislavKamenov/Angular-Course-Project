import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './components/core/core.module';
import { AuthModule } from './components/authentication/auth.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent        
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,        
        CoreModule,
        AuthModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
