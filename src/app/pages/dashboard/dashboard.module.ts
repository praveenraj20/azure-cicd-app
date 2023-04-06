import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { MaterialModule } from 'src/app/material.module';
import { OwnerComponent } from './feature/owner/owner.component';
import { PartnerComponent } from './feature/partner/partner.component';
import { SeekerComponent } from './feature/seeker/seeker.component';
import { AdminComponent } from './feature/admin/admin.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    OwnerComponent,
    PartnerComponent,
    SeekerComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    routing,
    MaterialModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
