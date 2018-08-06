import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }

        return next
            .handle(request)
            .pipe(
                tap((res: HttpEvent<any>) => {
                    if (res instanceof HttpResponse && res.body.data.token) {
                        console.log('test1');
                        this.saveToken(res.body.data);                        
                        this.toastr.success(res.body.message, 'Success!');
                        this.router.navigate(['/home']);              
                    } else if (res instanceof HttpResponse && res.url.endsWith('/signup')) {
                        console.log('test2');
                        this.toastr.success(res.body.message, 'Success!');
                        this.router.navigate(['/signin']);
                    }
                })
            )
    }

    private saveToken(data): void {
        localStorage.setItem('currentUser', JSON.stringify({            
            token: data.token
        }));
    }

}