import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import {
  InvoiceDetailResponse,
  InvoiceDetails,
  InvoiceStatus,
  InvoiceUpdateData,
  WorkEfforts,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  @ViewChild('tabset') tabset!: TabsetComponent;
  showSP: boolean = true;
  showSS: boolean = false;
  invoiceDetails: InvoiceDetails[] = [];
  invoiceId: string = '';
  invoiceDate: string = '';
  dialogConfig: string = '';
  isLoading = false;
  _invoiceDetails: InvoiceDetails[] = [];
  invoiceStatusList: InvoiceStatus[] = [];
  candidateItemList: WorkEfforts[] = [];

  constructor(
    private readonly router: Router,
    private readonly invoiceService: InvoiceService,
    private readonly _appService: AppService
  ) {}

  ngOnInit(): void {
    this.getAllInvoiceDetails();
    this.getAllInvoiceDetailAdmin();
    this.getInvoiceStatus();
  }

  updateStatus(
    invoiceid: string,
    statusid: number,
    status: string,
    comment: string
  ) {
    if (status != 'Rejected') {
      Swal.fire({
        title: 'Are you sure?',
        text: `The status will be changed to ${status}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.invoiceService
            .updateInvoiceStatus(invoiceid, statusid, 'NA')
            .subscribe(
              (res) => {
                this._appService.toastr(`${status} successfully`, {
                  icon: 'success',
                });
                this.getAllInvoiceDetails();
              },
              (err) => {
                this._appService.toastr(err, { icon: 'error' });
              }
            );
          //}
        }
      });
    }
    if (status === 'Paid' || status === 'Rejected') {
      Swal.fire({
        input: 'textarea',
        inputLabel: 'Comments',
        // inputPlaceholder: 'Type your Comments here...',
        inputValue: comment,
        showCancelButton: true,
        inputValidator: (value): any => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this._appService
            .confirmation(
              'Are you sure',
              `The status will be changed to ${status}`,
              { showCancelButton: true }
            )
            .then(() => {
              this.invoiceService
                .updateInvoiceStatus(invoiceid, statusid, result.value)
                .subscribe(
                  (res) => {
                    this._appService.toastr(`${status} successfully`, {
                      icon: 'success',
                    });
                    this.getAllInvoiceDetails();
                  },
                  (err) => {
                    this._appService.toastr(err, { icon: 'error' });
                  }
                );
            });
        }
      });
    }
  }

  updateStatus2(invoiceid: string, statusid: number, status: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `The status will be changed to ${status}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService
          .getInvoiceByInvoiceId(invoiceid, this.showSP)
          .subscribe(
            (res) => {
              this.invoiceId = invoiceid;
              this.invoiceDate = res.invoiceDate as string;
              this.candidateItemList = res.invoiceData as [];

              console.log(res);
              this.dialogConfig = 'rateCard';
            },
            (err) => {
              this._appService.toastr(err, { icon: 'error' });
            }
          );
      }
    });
  }

  getAllInvoiceDetails() {
    this.invoiceService.getAllInvoiceDetails().subscribe((res) => {
      this.invoiceDetails = res;
    });
  }

  getAllInvoiceDetailAdmin() {
    this.invoiceService.getAllInvoiceDetailAdmin().subscribe((res) => {
      this._invoiceDetails = res;
    });
  }

  onSP() {
    this.showSP = true;
    this.showSS = false;
  }

  onSS() {
    this.showSP = false;
    this.showSS = true;
  }

  getInvoiceStatus() {
    this.invoiceService.getInvoiceStatus().subscribe((res) => {
      this.invoiceStatusList = res;
    });
  }

  onPreview(id: any): void {
    this.router.navigate(['/invoice/preview-invoices'], {
      queryParams: { invoiceId: id, isSkillPartner: this.showSP },
    });
  }

  onPreview1(id: any): void {
    this.router.navigate(['/invoice/preview-invoices'], {
      queryParams: { invoiceId: id, isSkillPartner: this.showSS },
    });
  }
}
