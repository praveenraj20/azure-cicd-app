import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { routing } from './hiring.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { CoreModule } from 'src/app/core/core.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PartnerEmployeesComponent } from './partner/partner-employees/partner-employees.component';
import { SharedModule } from '../shared';
import { PartnerHistoryComponent } from './partner/partner-history/partner-history.component';
import { HistoryComponent } from './history/history.component';
import { MaterialModule } from 'src/app/material.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    HiringComponent,
    EmployeesComponent,
    PartnerEmployeesComponent,
    PartnerHistoryComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    MaterialModule,
    TabsModule
  ]
})
export class HiringModule { }
