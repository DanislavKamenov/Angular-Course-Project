import { Component, OnInit } from '@angular/core';
import { UserService } from './components/core/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(private userS: UserService) { }

    ngOnInit() {
        console.log(this.userS.isLoggedIn());
    }
}
