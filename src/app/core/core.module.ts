import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AutofocusDirective } from "./directives/autofocus.directive";
import { DateFormatDirective } from "./directives/date-format.directive";
import { FileUploadInputDirective } from "./directives/file-upload-input.directive";
import { PhoneMaskDirective } from "./directives/phone-mask.directive";
import { BytesPipe } from "./pipes/bytes.pipe";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { ReversePipe } from "./pipes/reverse.pipe";
import { SearchFilterPipe } from "./pipes/search.pipe";
import { SortByKeyPipe } from "./pipes/sort.pipe";
import { TotalPipe } from "./pipes/total.pipe";

const DIRECTIVES: Array<any> = [
  AutofocusDirective,
  DateFormatDirective,
  FileUploadInputDirective,
  PhoneMaskDirective
];

const PIPES: Array<any> = [
  BytesPipe,
  OrderByPipe,
  ReversePipe,
  SearchFilterPipe,
  SortByKeyPipe,
  TotalPipe,
];

@NgModule({
  declarations: [
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class CoreModule { }
