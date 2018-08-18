import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { ModalService } from '../../../shared/services/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private modalService: ModalService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.userService.isLoggedIn()) {
            return true;
        }
        console.log(next.paramMap);
        console.log(state.url);
        this.modalService.createLoginRedirectModal();
        return false;
    }
}
