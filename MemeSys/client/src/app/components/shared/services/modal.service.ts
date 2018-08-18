import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ModalComponent } from "../modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private modal: NgbModal) {  }

    createRedirectModal(title: string, message: string, redirectUrl: string): void {
            const activeModal = this.modal.open(ModalComponent);
            activeModal.componentInstance.modalType = 'redirect';
            activeModal.componentInstance.title = title;
            activeModal.componentInstance.message = message;
            activeModal.componentInstance.redirectUrl = redirectUrl;
            activeModal.componentInstance.buttonText = 'Login';
    }

    createLoginRedirectModal(
        message: string = 'You must login in in order to access this page.', 
        title: string = 'WARNING') {
            const redirectUrl = '/auth/login';

            this.createRedirectModal(title, message, redirectUrl);
    }
}