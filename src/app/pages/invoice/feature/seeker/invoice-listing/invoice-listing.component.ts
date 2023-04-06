import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceDetails } from 'src/app/api/flexcub-api/models/invoice-details';
import { InvoiceStatus } from 'src/app/api/flexcub-api/models/invoice-status';
import { Registration } from 'src/app/api/flexcub-api/models/registration';
import { AppService } from 'src/app/app.service';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-invoice-listing',
  templateUrl: './invoice-listing.component.html',
  styleUrls: ['./invoice-listing.component.scss']
})
export class InvoiceListingComponent implements OnInit {
  user: Registration;
  invoiceDetails: InvoiceDetails[] = [];
  invoiceStatusList: InvoiceStatus[] = [];
  seekerId!:number
  constructor(
    private readonly _appService: AppService,
    private readonly _service: InvoiceService,
    private readonly router: Router,
    ) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.getAllInvoiceDetails();
    this.getInvoiceStatus();
  }

  getAllInvoiceDetails(): void {
    this.seekerId = this.user?.id as number;
    this._service.getAdminInvoiceBySeeker(this.seekerId as number).subscribe((res) => {
      this.invoiceDetails = res;
    });
  }

  updateStatus(invoiceid:string,statusid:number,status:string,comment:string) {
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
        if (status === 'Rejected'||status === 'Paid') {
          const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Comments',
            inputPlaceholder: 'Type your Comments here...',
            inputValue: comment,
            inputAttributes: {
              'aria-label': 'Type your Comments here',
            },
            showCancelButton: true,
            inputValidator: (value):any => {
              if (!value) {
                return 'You need to write something!';
              }
            },
          });

          if (text) {
            this._service.updateSeekerInvoiceStatus(invoiceid, statusid, text).subscribe(
              (res) => {
               this._appService.toastr(`${status} successfully`,{icon:'success'})
                this.getAllInvoiceDetails();
              },
              (error) => {
                this._appService.toastr(error);
              }
            );
          }
        } else {
          this._service.updateSeekerInvoiceStatus(invoiceid, statusid, 'NA').subscribe(
            (res) => {
              this._appService.toastr(`${status} successfully`,{icon:'success'})
              this.getAllInvoiceDetails();
            },
            (error) => {
              this._appService.toastr(error);
            }
          );
        }
      }
    });
  }

  getInvoiceStatus() {
    this._service.getInvoiceStatus().subscribe((res) => {
      this.invoiceStatusList = res;
      console.log(this.invoiceStatusList);
    });
  }

  preview(id:string):void{
    this.router.navigate(['/invoice/preview-invoice'], {
      queryParams: { invoiceId: id },
    });
  }


}
