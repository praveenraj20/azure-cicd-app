import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PartnersAdminComponent } from './partners-admin.component';
import { AddComponent } from './add/add.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { routing } from './partners-admin.routing';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';



@NgModule({
  declarations: [
    PartnersAdminComponent,
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
export class PartnersAdminModule { }
