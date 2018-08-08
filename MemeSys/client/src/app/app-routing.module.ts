import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './components/authentication/auth.module';
import { HomeComponent } from './components/home/home.component';
import { MemesModule } from './components/memes/memes.module';

const routes: Routes = [    
    { path: 'home', component: HomeComponent },
    { path: 'auth', loadChildren: () => AuthModule },
    { path: 'memes', loadChildren: () => MemesModule },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }