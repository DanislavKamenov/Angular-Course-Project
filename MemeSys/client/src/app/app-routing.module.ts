import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './components/authentication/auth.module';
import { HomeComponent } from './components/home/home.component';
import { MemesModule } from './components/memes/memes.module';
import { AdminModule } from './components/admin/admin.module';
import { UserModule } from './components/user/user.module';

const routes: Routes = [    
    { path: 'home', component: HomeComponent },
    { path: 'auth', loadChildren: () => AuthModule },
    { path: 'memes', loadChildren: () => MemesModule },
    { path: 'admin', loadChildren: () => AdminModule },
    { path: 'user', loadChildren: () => UserModule },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
