import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../shared/services/user.service';
import { ModalService } from '../../../shared/services/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private modalService: ModalService,
        private toastr: ToastrService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.userService.isLoggedIn()) {
            return true;
        }

        if (this.router.navigated) {
            this.modalService.createLoginRedirectModal();
            return false;
           
        } else {
            this.toastr.info('You must login to access this page.', 'Info');
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
