import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

/**
 * A material design file upload queue component.
 */
@Directive({
  selector: 'input[fileUploadInput], div[fileUploadInput]',
})
export class FileUploadInputDirective {
  private _queue: any = null;
  private _element: HTMLElement;
  @Output() public onFileSelected: EventEmitter<FileList> = new EventEmitter<FileList>();

  constructor(private element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  @Input('fileUploadInput')
  set fileUploadQueue(value: any) {
    if (value) {
      this._queue = value;
    }
  }

  @HostListener('change')
  public onChange(): any {
    let files = this.element.nativeElement?.files as FileList;
    this.onFileSelected.emit(files);

    for (var i = 0; i < files.length; i++) {
      this._queue?.add(files[i]);
    }
    this.element.nativeElement.value = '';
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any): any {
    let files = event.dataTransfer?.files as FileList;
    this.onFileSelected.emit(files);

    for (var i = 0; i < files.length; i++) {
      this._queue?.add(files[i]);
    }
    event.preventDefault();
    event.stopPropagation();
    this.element.nativeElement.value = '';
  }

  @HostListener('dragover', ['$event'])
  public onDropOver(event: any): any {
    event.preventDefault();
  }
}
