import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SeekersComponent } from './seekers.component';
import { AddComponent } from './add/add.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material.module';
import { routing } from './seekers.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';



@NgModule({
  declarations: [
    SeekersComponent,
    AddComponent,
    AdminListComponent,
    AdminAddComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    QuillModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SeekersModule { }
