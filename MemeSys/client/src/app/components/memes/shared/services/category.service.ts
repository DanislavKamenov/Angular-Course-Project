import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ServerResponse } from '../../../core/models/server-response.model';
import { Category } from '../models/category.model';
import { MemeService } from './meme.service';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {   
    private allUrl: string = root + 'category';
    
    constructor(
        private http: HttpClient,
        private memeService: MemeService,
        private toastr: ToastrService) { }

    getAllCategories(): Observable<Category[]> {
        return this.http
            .get<ServerResponse<Category[]>>(this.allUrl)
            .pipe(
                catchError(this.handleError<Category[]>([])),    
                map(res => res.data.categories)
            );
    }

    private handleError<T>(result: T) {
        return (res: HttpErrorResponse) => {
            console.log(res);
            this.toastr.error(`${res.error.message || res.error}`, `${res.statusText}:`);

            const response: ServerResponse<T> = {
                success: true,
                statusCode: 200,
                data: { categories: result}
            }
            return of(response);
        }
    }
}