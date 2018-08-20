import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ServerResponse } from '../../shared/models/server-response.model';
import { Category } from '../models/view-models/category.model';
import { CategoryInput } from '../models/input-models/category-input.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {   
    private allUrl: string = `${root}category/`;
    
    constructor(private http: HttpClient) { console.log('cat service'); }

    getAllCategories(): Observable<Category[]> {
        return this.http
            .get<ServerResponse<Category[]>>(this.allUrl)
            .pipe(
                catchError(this.handleError<Category[]>([])),    
                map(res => res.data.categories)
            );
    }

    createCategory(category: CategoryInput): Observable<Category> {
        return this.http
            .post<ServerResponse<Category>>(this.allUrl, category)
            .pipe(
                catchError(this.handleError<Category>()),    
                map(res => res.data.category)
            );
    }

    deleteCategory(id: string): Observable<Category> {
        const categoryDeleteUrl = `${this.allUrl}${id}`;
        return this.http
            .delete<ServerResponse<Category>>(categoryDeleteUrl)
            .pipe(
                catchError(this.handleError<Category>()),    
                map(res => res.data.category)
            );
    }

    private handleError<T>(result?: T) {
        return (res: HttpErrorResponse) => {
            console.log(res);

            const response: ServerResponse<T> = {
                success: true,
                statusCode: 200,
                data: { categories: result}
            }
            return of(response);
        }
    }
}