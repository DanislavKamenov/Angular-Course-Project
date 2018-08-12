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
    @Input() buttonText: string;
    constructor(public activeModal: NgbActiveModal) { }

}
