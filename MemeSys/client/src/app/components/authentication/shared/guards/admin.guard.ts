import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route,
    CanLoad
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ModalService } from '../../../sharedModule/services/modal.service';
import { UserService } from '../../../sharedModule/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
    constructor(
        private userService: UserService,
        private modalService: ModalService,
        private toastr: ToastrService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAllowedAccess()
    }

    canLoad(route: Route): boolean {
        return this.isAllowedAccess();
    }

    isAllowedAccess(): boolean {
        if (this.userService.isLoggedIn() && this.userService.currentUser.isAdmin) {
            return true;
        }

        if (this.router.navigated) {
            this.modalService.createLoginRedirectModal('You must be an administrator in order to access this page.');
            return false;

        } else {
            this.toastr.info('You must be an administrator in order to access this page.', 'Info');
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
