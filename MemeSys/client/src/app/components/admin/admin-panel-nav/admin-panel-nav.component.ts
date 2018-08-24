import { Component } from '@angular/core';
import { fadeAnimations } from '../../sharedModule/animations/fade.animations';

@Component({
    selector: 'app-admin-panel-nav',
    templateUrl: './admin-panel-nav.component.html',
    styleUrls: ['./admin-panel-nav.component.css'],
    animations: fadeAnimations
})
export class AdminPanelNavComponent {
    justifySetting: string = 'justified';
    
    constructor() { }
}
