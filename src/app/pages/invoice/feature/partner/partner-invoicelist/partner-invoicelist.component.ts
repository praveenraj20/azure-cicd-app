import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  InvoiceListingData,
  InvoiceStatus,
  InvoiceUpdateData,
} from 'src/app/api/flexcub-api/models';
import { Registration } from 'src/app/api/flexcub-api/models/registration';
import { AppService } from 'src/app/app.service';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partner-invoicelist',
  templateUrl: './partner-invoicelist.component.html',
  styleUrls: ['./partner-invoicelist.component.scss'],
  providers: [DatePipe],
})
export class PartnerInvoicelistComponent implements OnInit {
  user!: Registration;
  partnerId!: number;
  isLoading: boolean = false;
  invoiceStatusList: InvoiceStatus[] = [];
  partnerInvoice: InvoiceListingData[] = [];
  candidateItemList: any = [];
  copycandidateItemListData: InvoiceUpdateData[] = [];
  invoiceId: string = '';
  invoiceDate: string = '';
  dialogConfig!: string;

  constructor(
    private readonly _invoiceService: InvoiceService,
    private readonly _appService: AppService,
    private readonly router: Router,
    private datePipe: DatePipe
  ) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.partnerId = this.user.id as number;
    this.getInvoices(this.partnerId);
    this.getInvoiceStatus();
  }

  getInvoices(id: number) {
    this._invoiceService.getInvoices(id).subscribe((res) => {
      this.partnerInvoice = res;
    });
  }

  getInvoiceStatus() {
    this._invoiceService.getInvoiceStatus().subscribe((res) => {
      this.invoiceStatusList = res;
    });
  }

  onPreview(id:string): void {
    this.router.navigate(['/invoice/partner-preview'], {
      queryParams: { invoiceId: id },
    });
  }

  get _publish(): boolean {
    return this.candidateItemList?.every((n: any) => n['amount'] !== null);
  }

  publish() {
    this.isLoading = true;
    if (
      !this.candidateItemList.every(
        (n: any) =>
          parseFloat(n['amount']) !== 0 && parseFloat(n['totalHours']) !== 0
      )
    ) {
      this._appService.toastr('Rate or totalHours cannot be 0', {
        icon: 'success',
      });
      return;
    }
    this.copycandidateItemListData = [];
    this.candidateItemList?.forEach((n: any) => {
      this.copycandidateItemListData.push({
        skillOwnerEntityId: n.skillOwnerEntityId,
        skillSeekerEntityId: n.skillSeekerEntityId,
        skillSeekerProjectEntityId: n.skillSeekerProjectEntityId,
        totalHours: n.totalHours,
        amount: n.amount,
      });
    });
    var req = {
      invoiceId: this.invoiceId,
      invoiceDate: this.datePipe.transform(
        this.invoiceDate,
        'yyyy-MM-dd'
      ) as string,
      invoiceUpdateList: this.copycandidateItemListData,
    };
    this.dialogConfig = '';
    this._invoiceService.updateInvoiceDetailsByPartner(req).subscribe(
      (res) => {
        this.router.navigate(['/invoice']).then(() => {
          this._invoiceService
            .updateInvoiceStatus(this.invoiceId, 1, 'NA')
            .subscribe(
              (res) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `Submitted successfully`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getInvoices(this.partnerId);
              },
              (error) => {
                this._appService.toastr(error);
              }
            );
        });
      },
      (error) => {
        this.isLoading = false;
        this._appService.toastr(error);
      }
    );
  }

  rateEntry(event: Event, n: any): void {
    n['amount'] = parseFloat((event.target as HTMLInputElement)?.value) || 0;
  }

  hoursEntry(event: Event, n: any): void {
    n['totalHours'] =
      parseFloat((event.target as HTMLInputElement)?.value) || 0;
  }

  onlyPrice(event: KeyboardEvent): void {
    const regex = /[0-9\\.\\]/;
    const character = String.fromCharCode(event?.charCode);
    event?.keyCode !== 8 && !regex.test(character)
      ? event?.preventDefault()
      : null;
  }
}
