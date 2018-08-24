import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerResponse } from '../../sharedModule/models/server-response.model';
import { Category } from '../models/view-models/category.model';
import { CategoryInput } from '../models/input-models/category-input.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {   
    private allUrl: string = `${root}category/`;
    private allAndMemes: string = `${this.allUrl}memes`;
    
    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<Category[]> {
        return this.http
            .get<ServerResponse<Category[]>>(this.allUrl)
            .pipe( 
                map(res => res.data.categories)
            );
    }

    getAllCategoriesAndMemes(): Observable<Category[]> {
        return this.http
            .get<ServerResponse<Category[]>>(this.allAndMemes)
            .pipe(    
                map(res => res.data.categories)
            );
    }

    createCategory(category: CategoryInput): Observable<Category> {
        return this.http
            .post<ServerResponse<Category>>(this.allUrl, category)
            .pipe(    
                map(res => res.data.category)
            );
    }

    deleteCategory(id: string): Observable<Category> {
        const categoryDeleteUrl = `${this.allUrl}${id}`;
        return this.http
            .delete<ServerResponse<Category>>(categoryDeleteUrl)
            .pipe(  
                map(res => res.data.category)
            );
    }
}