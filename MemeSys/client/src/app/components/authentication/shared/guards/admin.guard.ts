import { Injectable, OnDestroy } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ModalService } from '../../../shared/services/modal.service';
import { UserService } from '../../../shared/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnDestroy {
    routerSub: Subscription;
    constructor(
        private userService: UserService,
        private modalService: ModalService,
        private toastr: ToastrService,
        private router: Router) { }

    ngOnDestroy(): void {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.userService.isLoggedIn() && this.userService.currentUser.isAdmin) {
            return true;
        }

        if (this.router.navigated) {
            this.modalService.createLoginRedirectModal('You must be an admin in order to access this page.');
            return false;
           
        } else {
            this.toastr.info('You must be an admin in order to access this page.', 'Info');
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}
