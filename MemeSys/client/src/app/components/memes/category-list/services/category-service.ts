import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ServerResponse } from '../../../shared/models/server-response.model';
import { Category } from '../../shared/models/category.model';

const root = '/api/';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private allUrl: string = root + 'category';
    
    constructor(private http: HttpClient) { }

    getAllCategories(): Observable<Category[]> {
        return this.http
            .get<ServerResponse<Category[]>>(this.allUrl)
            .pipe(map(res => res.data.categories));
    }
}