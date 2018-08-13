import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    calcTime(dateIsoFormat: Date): string {
        let diff = +new Date() - +(new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + this.pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + this.pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + this.pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + this.pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + this.pluralize(diff);   
    }

    private pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}