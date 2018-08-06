import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './components/authentication/auth.module';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    { path: 'auth', loadChildren: () => AuthModule },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
