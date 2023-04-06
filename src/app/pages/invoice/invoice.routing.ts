import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { AdminListComponent } from './feature/admin-list/admin-list.component';
import { CreateInvoicesComponent } from './feature/partner/create-invoices/create-invoices.component';
import { PartnerInvoicelistComponent } from './feature/partner/partner-invoicelist/partner-invoicelist.component';
import { PreviewPartnerComponent } from './feature/partner/preview-partner/preview-partner.component';
import { PreviewAdminComponent } from './feature/preview-admin/preview-admin.component';
import { InvoiceListingComponent } from './feature/seeker/invoice-listing/invoice-listing.component';
import { PreviewInvoiceComponent } from './feature/seeker/preview-invoice/preview-invoice.component';
import { InvoiceComponent } from './invoice.component';
const routes: Routes = [
  { path: '', component: InvoiceComponent },
  { path: 'invoice-list', component: InvoiceListingComponent },
  { path: 'preview-invoice', component: PreviewInvoiceComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'preview-invoices', component: PreviewAdminComponent },
  { path: 'partner-list', component: PartnerInvoicelistComponent },
  { path: 'create-invoices', component: CreateInvoicesComponent },
  { path: 'partner-preview', component: PreviewPartnerComponent },
];

export const routing: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
