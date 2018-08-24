import { Pipe } from "@angular/core";

@Pipe({
    name: 'urlShorten'
})
export class UrlShortenPipe {

    transform(value: string, sliceLen: number): string {
        if (value.length > sliceLen) {
            return value.slice(0, sliceLen) + '...';
        }
        return value;
    }
}