import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    isFormHidden: boolean = true;
    constructor() { }

    ngOnInit() {
    }

    onCategoryButtonClick(): void {
        this.isFormHidden = !this.isFormHidden;
    }

}
