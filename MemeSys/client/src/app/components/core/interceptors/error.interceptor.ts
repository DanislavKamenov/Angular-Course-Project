import {
    HttpRequest,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        return next
            .handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {

                    if (err.status >= 400) {
                        let message = err.error.message || err.message;
                        this.toastr.error(message, 'Error:');
                    }

                    return throwError(err);
                })
            )
    }
}