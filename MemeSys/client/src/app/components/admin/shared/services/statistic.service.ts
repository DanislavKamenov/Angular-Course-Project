import { Injectable } from "@angular/core";

import { Category } from "../../../category/models/view-models/category.model";
import { Meme } from "../../../memes/shared/models/view-models/meme.model";

@Injectable({
    providedIn: 'root'
})
export class StatisticService {
    calcTotalMemes(categories: Category[]): number {
        return categories.map(c => c.memes.length).reduce((a, b) => a+= b, 0);
    }

    calcCommentsInCategory(memes: Meme[]): number {
        return memes.map(m => m.comments.length).reduce((a, b) => a+= b, 0);
    }

    calcTotalComments(categories: Category[]): number {
        return categories.map(c => c.memes.map(m => m.comments.length).reduce((a, b) => a += b, 0)).reduce((a, b) => a+= b, 0);
    }
}