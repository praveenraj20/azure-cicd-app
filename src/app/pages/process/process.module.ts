import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProcessComponent } from './process.component';
import { routing } from './process.routing';
import { MsaComponent } from './feature/seeker/msa/msa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestionsComponent } from './feature/selection/suggestions/suggestions.component';
import { DefineComponent } from './feature/selection/define/define.component';
import { ProgressComponent } from './feature/selection/progress/progress.component';
import { ProgressEditComponent } from './feature/selection/progress-edit/progress-edit.component';
import { ProgressNotificationComponent } from './feature/selection/progress-notification/progress-notification.component';
import { MaterialModule } from 'src/app/material.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressViewComponent } from './feature/selection/progress-view/progress-view.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PoComponent } from './feature/seeker/po/po.component';
import { SowComponent } from './feature/seeker/sow/sow.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProcessComponent,
    MsaComponent,
    PoComponent,
    SowComponent,
    SuggestionsComponent,
    DefineComponent,
    ProgressComponent,
    ProgressEditComponent,
    ProgressNotificationComponent,
    ProgressViewComponent
  ],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PdfViewerModule,
    CoreModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    DatePipe
  ]
})
export class ProcessModule { }
