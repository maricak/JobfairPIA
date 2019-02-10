import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        let index = value.indexOf('_');
        return value.substring(index + 1);
    }

}
