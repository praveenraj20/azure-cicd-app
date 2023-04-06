import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { endOfWeek, startOfWeek ,addDays } from 'date-fns';
import html2canvas from 'html2canvas';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {
  AdminInvoice,
  ClientInvoiceDetails,
  ClientProjects,
  FileResponse,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { IAdminInvoice } from 'src/app/core/models';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  step: number = 1;
  webkitRelativePath1:string =''
  _view!:boolean;
  ownerInfo!:IAdminInvoice;
  listOfClient: ClientInvoiceDetails[] = [];
  listOfProject:ClientProjects[]  = [];
  partnerInfo: IAdminInvoice[] = [];
  seekerName!: string;
  array: IAdminInvoice[] = [];
  array2:IAdminInvoice[] = [];
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  date!: Date;
  invoiceDueDates!: string;
  selectedDueDate: Date | undefined;
  startDate!:Date
  // selectedWeek = new Date(this.startDate)
   selectedWeek: Date = startOfWeek(new Date(), { weekStartsOn: 0 });
  // startDate!: Date;
  end!: Date;
  today = new Date();
  endDate: Date = new Date();
  maxDate: Date = endOfWeek(new Date(), { weekStartsOn: 0 });
  bgConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    selectWeek: true,
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-dark-blue',
  };
  checkbox1: boolean = false;
  constructor(
    private readonly invoiceservice: InvoiceService,
    private router: Router,
    private _appService: AppService
  ) {


  }

  ngOnInit(): void {
    this.invoiceClientDetails();
    this.selectedDueDate = addDays(new Date(), 42);
  }

  clientForm = new FormGroup({
    client: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
  });

  invoiceClientDetails() {
    this.invoiceservice.invoiceClientDetails().subscribe((res) => {
      this.listOfClient = res;
    });
  }

  onChangeClient() {
    this.clientForm.value.client;
    this.listOfProject = this.clientForm.value.client.clientProjects;
  }

  onChangeProject() {
    this.invoiceservice
      .getPartnerInvoiceBySeeker(
        this.clientForm.value.client.skillSeekerId,
        this.clientForm.value.project.projectId
      )
      .subscribe((res) => {
        console.log(res);
        this.partnerInfo = res;
        this.startDate = new Date(this.partnerInfo[0]?.startDate as string);
        this.invoiceDueDates = this.partnerInfo[0]?.invoiceDueDate as string;
        this.seekerName = this.partnerInfo[0]?.client as string;
      });
  }

  next(i: number): void {
    this.step = i;
    this.finalAmt = this.array?.reduce(
      (n, { amount }) => n + amount!,
      0
    );
    this.finalCount = this.array?.length;
    this.finalHours = this.array.reduce(
      (n, { totalHours }) => n + totalHours!,
      0
    );
  }

  getAnswers(data: IAdminInvoice, event: Event) {
    const target = (event.target as HTMLInputElement)?.checked
    if (target) {
      const index = this.array.findIndex(
        (object) =>
          object.invoiceDataId === data.invoiceDataId
      );
      const index2 = this.partnerInfo.findIndex(
        (object) => object.invoiceDataId === data.invoiceDataId
      );
      this.partnerInfo[index2].checkbox1 = true;
      this.checkbox1 = true;
      if (index === -1) {
        var data2 : IAdminInvoice = {
          invoiceId: data.invoiceDataId,
        };
          this.invoiceservice
            .urlDownloadTimesheetDocuments(data.timesheetId!)
            .subscribe(
              (filedata: FileResponse) => {
                this.webkitRelativePath1 = filedata?.fileDownloadUri as string;
                data['path'] = this.webkitRelativePath1;
                this.array.push(data);
                console.log(this.array);
              },
              (error) => {
                data['path'] = '';
                this.array.push(data);
              }
            );

        this.array2.push(data2);
      }
    } else {
      const index2  = this.partnerInfo.findIndex(
        (object) => object.invoiceDataId === data.invoiceDataId
      );
      this.partnerInfo[index2].checkbox1 = false;
      const index = this.array2.findIndex(
        (object) =>
          object.invoiceId === data.invoiceDataId
      );
      const index3 = this.array.findIndex(
        (object) =>
          object.invoiceDataId === data.invoiceDataId
      );
      this.array.splice(index, 1);
      this.array2.splice(index, 1);
    }

  }

  send() {
    this.invoiceservice.saveInvoiceDetailsByAdmin(this.array2).subscribe(
      (res) => {
        this.router
          .navigate(['/invoice/admin-list'], { queryParams: { type: 'SS' } })
          .then(() => {
            this._appService.toastr(`The Invoice is submitted successfully`, {
              icon: 'success',
            });
          });
      },
      (error) => {
        this._appService.toastr(error);
      }
    );
  }

  download() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'invoice.png';
      this.downloadLink.nativeElement.click();
      for (let i = 0; i < this.array.length; i++) {
        if(this.array[i].path !==''){
          let url = this.array[i].path;
          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url as string;
          a.click();
        }

      }
    });
  }

  openView(n: IAdminInvoice) {
    this.startDate=new Date(n.startDate!);
    this._view = true;
    this.ownerInfo = n;
    n.ownerId;

  }

  closeView(): void {
    this._view = false;
  }
}
