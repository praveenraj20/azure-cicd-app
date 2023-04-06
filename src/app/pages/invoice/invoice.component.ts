import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../shared';
import { AdminListComponent } from './feature/admin-list/admin-list.component';
import { PartnerInvoicelistComponent } from './feature/partner/partner-invoicelist/partner-invoicelist.component';
import { InvoiceListingComponent } from './feature/seeker/invoice-listing/invoice-listing.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  component: any;

  constructor(private readonly _appService: AppService) {
    const j = [
      { role: ERole.ADMIN, ref: AdminListComponent },
      { role: ERole.SEEKER, ref: InvoiceListingComponent },
      { role: ERole.PARTNER, ref: PartnerInvoicelistComponent },
    ];

    const i =
      j.findIndex((e) => e?.role === this._appService.user?.roles?.rolesId) ??
      -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }

  ngOnInit(): void {}
}
