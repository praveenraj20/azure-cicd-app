import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(group: Array<any>, value: string, items?: string[]): any {
    if (!value) return group;

    return group?.filter((n) => items?.some((key) => n[key]?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1)) ?? group;
  }
}