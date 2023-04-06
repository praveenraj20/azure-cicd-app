import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortByKey',
})
export class SortByKeyPipe implements PipeTransform {
  transform(value: Array<any>, key: string): any[] {
    return value.sort((n1, n2) => {
      return n2[key] - n1[key];
    });
  }
}
