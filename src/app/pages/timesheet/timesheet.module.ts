import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { OwnerTimesheetComponent } from './owner/owner-timesheet/owner-timesheet.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { routing } from './timesheet.routing';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TimesheetComponent,
    OwnerTimesheetComponent
  ],
  imports: [
    CommonModule,
    routing,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class TimesheetModule { }
