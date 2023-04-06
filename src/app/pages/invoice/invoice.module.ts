import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { routing } from './invoice.routing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SeekerComponent } from './feature/seeker/seeker.component';
import { InvoiceListingComponent } from './feature/seeker/invoice-listing/invoice-listing.component';
import { PreviewInvoiceComponent } from './feature/seeker/preview-invoice/preview-invoice.component';
import { PartnerComponent } from './feature/partner/partner.component';
import { PartnerInvoicelistComponent } from './feature/partner/partner-invoicelist/partner-invoicelist.component';
import { CreateInvoicesComponent } from './feature/partner/create-invoices/create-invoices.component';
import { AdminListComponent } from './feature/admin-list/admin-list.component';
import { PreviewAdminComponent } from './feature/preview-admin/preview-admin.component';
import { PreviewPartnerComponent } from './feature/partner/preview-partner/preview-partner.component';
import { TimesheetDetailsComponent } from './feature/partner/timesheet-details/timesheet-details.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    CreateInvoiceComponent,
    SeekerComponent,
    InvoiceListingComponent,
    PreviewInvoiceComponent,
    PartnerComponent,
    PartnerInvoicelistComponent,
    CreateInvoicesComponent,
    AdminListComponent,
    PreviewAdminComponent,
    PreviewPartnerComponent,
    TimesheetDetailsComponent

  ],
  imports: [
    CommonModule,
    TabsModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule
  ],
  providers: [ DatePipe ]
})
export class InvoiceModule { }
