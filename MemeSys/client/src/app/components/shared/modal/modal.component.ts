import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Input() modalType: string;
    @Input() message: string;
    @Input() title: string;
    @Input() redirectUrl: string;
    @Input() buttonText: string;
    @Input() action: Function;
    constructor(public activeModal: NgbActiveModal) { }

    executeActionAndClose(): void {
        this.action();
        this.activeModal.close();
    }
}
