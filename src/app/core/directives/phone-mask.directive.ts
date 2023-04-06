import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: string) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: Event) {
    this.onInputChange((event.target as HTMLInputElement).value, true);
  }

  onInputChange(event: string, backspace: boolean) {
    let n = event.replace(/\D/g, '');
    if (backspace && n.length <= 6) {
      n = n?.substring(0, n.length - 1);
    }
    if (n.length === 0) {
      n = '';
    } else if (n.length <= 3) {
      n = n.replace(/^(\d{0,3})/, '($1)');
    } else if (n.length <= 6) {
      n = n.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (n.length <= 10) {
      n = n.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      n = n.substring(0, 9);
      n = n.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    this.ngControl.valueAccessor?.writeValue(n);
  }
}
