import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(value: Array<number>) {
    const a = value?.reduce((j: number, k: number) => j + k) ?? 0;
    return a;
  }
}
