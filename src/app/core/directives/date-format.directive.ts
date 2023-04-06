import { Directive } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MONTHFORMAT } from '../constants/constant';

@Directive({
  selector: '[appYearMonthFormat]',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MONTHFORMAT }],
})
export class DateFormatDirective {}
