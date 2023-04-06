import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FileResponse,
  Registration,
  WorkEfforts,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { addDays, endOfWeek, isBefore, startOfWeek, subDays } from 'date-fns';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';
import { ownerImgUrl } from 'src/app/core/constants/constant';
import { Invoiceresponse, IWorkEfforts } from 'src/app/core/models';
import { Router } from '@angular/router';
import { OwnerTimeSheetControllerService } from 'src/app/api/flexcub-api/services/owner-time-sheet-controller.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-create-invoices',
  templateUrl: './create-invoices.component.html',
  styleUrls: ['./create-invoices.component.scss'],
})
export class CreateInvoicesComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  step: number = 1;
  webkitRelativePath1!: string;
  user!: Registration;
  ownerDetails: IWorkEfforts[] = [];
  date!: Date;
  selectedWeek: Date = startOfWeek(new Date(), { weekStartsOn: 0 });
  startDate!: string;
  end!: string;
  today = new Date();
  endDate: Date = new Date();
  maxDate: Date = endOfWeek(new Date(), { weekStartsOn: 0 });
  bgConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    selectWeek: true,
    dateInputFormat: 'MM/DD/YYYY',
    containerClass: 'theme-dark-blue',
  };
  soImgUrl = ownerImgUrl;
  partnerId!: number;
  partnerName!: string;
  taxid!: string;
  location!: string;
  array: IWorkEfforts[] = [];
  array2: Invoiceresponse[] = [];
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  _serviceFeeAmount!: number;
  amountPayable!: number;
  _view!:boolean;
  ownerInfo!:WorkEfforts;
  constructor(
    private readonly _appService: AppService,
    private readonly invoiceService: InvoiceService,
    private readonly service: OwnerTimeSheetControllerService,
    private readonly router: Router
  ) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    // this.selectedDueDate = new Date(new Date().getTime() + 42 * 24 * 60 * 60 * 1000);
    this.partnerId = this.user?.id as number;
    this.partnerName = this.user?.businessName as string;
    this.taxid = this.user?.taxIdBusinessLicense as string;
    this.location = this.user?.city as string;
  }

  next(i: number): void {
    this.step = i;
    if (i == 2) {
      this.finalAmt = this.array?.reduce((n, { amount }) => n + amount!, 0);
      this.finalCount = this.array?.length;
      this.finalHours = this.array.reduce(
        (n, { totalHours }) => n + totalHours!,
        0
      );
      this._serviceFeeAmount = this.array?.reduce(
        (n, { serviceFeesAmount }) => n + serviceFeesAmount!,
        0
      );
      this.amountPayable = this.finalAmt - this._serviceFeeAmount;
    }
  }

  getAnswers(data: IWorkEfforts, event: Event) {
    const target = (event.target as HTMLInputElement)?.checked;
    if (target) {
      console.log(event);

      const index = this.array.findIndex(
        (object) => object.skillOwnerEntityId === data.skillOwnerEntityId
      );
      const index2 = this.ownerDetails.findIndex(
        (object) => object.skillOwnerEntityId === data.skillOwnerEntityId
      );
      this.ownerDetails[index2].checkbox1 = true;
      if (index === -1) {
        var data2: Invoiceresponse = {
          skillSeekerId: data.skillSeekerEntityId,
          skillSeekerProjectId: data.skillSeekerProjectEntityId,
          skillOwnerId: data.skillOwnerEntityId,
          totalHours: data.totalHours,
          amount: data.amount,

        };
        if (data.timesheetId) {
          this.invoiceService
            .urlDownloadTimesheetDocuments(data.timesheetId)
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
        }
        this.array2.push(data2);
      }
    } else {
      const index2 = this.ownerDetails.findIndex(
        (object) => object.skillOwnerEntityId === data.skillOwnerEntityId
      );
      this.ownerDetails[index2].checkbox1 = false;
      const index = this.array2.findIndex(
        (object) => object.skillOwnerId === data.skillOwnerEntityId
      );
      const index3 = this.array.findIndex(
        (object) => object.skillOwnerEntityId === data.skillOwnerEntityId
      );
      this.array.splice(index3, 1);
      this.array2.splice(index, 1);
    }
    console.log(this.array);
  }

  buildWeekOptions(j?: Date): void {
    if (j) {
      const date = startOfWeek(j, { weekStartsOn: 0 });
      const date2 = endOfWeek(j, { weekStartsOn: 0 });
      (this.startDate = this._appService.convertTime(date)),
        (this.end = this._appService.convertTime(date2)),
        this.getOwnersByPartners(this.partnerId, this.startDate, this.end);
    }
  }

  weekChange(position: 'next' | 'previous'): void {
    const next = () => {
      const j = addDays(startOfWeek(this.selectedWeek), 7);
      const k = isBefore(j, this.maxDate);
      if (!k) return;
      this.selectedWeek = j;
    };
    const previous = () => {
      const j = subDays(startOfWeek(this.selectedWeek), 7);
      this.selectedWeek = j;
    };
    position === 'next' ? next() : position === 'previous' ? previous() : null;
  }

  getOwnersByPartners(partnerId: number, startDate: string, endDate: string) {
    this.invoiceService
      .getOwnersByPartners(partnerId, startDate, endDate)
      .subscribe(
        (res) => {
          this.ownerDetails = res;
          for (let i = 0; i < this.ownerDetails.length; i++) {
            this.invoiceService
              .downloadImage(this.ownerDetails[i]?.skillOwnerEntityId as number)
              .subscribe(
                (res) => {
                  this.ownerDetails[i]['image'] =
                    this.soImgUrl + this.ownerDetails[i].skillOwnerEntityId;
                },
                (err) => {
                  if (err.status == 200) {
                    this.ownerDetails[i]['image'] =
                      this.soImgUrl + this.ownerDetails[i].skillOwnerEntityId;
                  } else {
                    this.ownerDetails[i][
                      'image'
                    ] = `assets/images/avatar-default-skillowner.png`;
                  }
                }
              );
          }
        },
        (err) => {
          this.ownerDetails = [];
          this._appService.toastr(err, { icon: 'error' });
        }
      );
  }

  send() {
    var request = {
      startDate: this.startDate,
      endDate: this.end,
      dueDate: this._appService.convertTime(
        addDays(new Date(), 42)
      ),
      skillPartnerId: this.partnerId,
      partnerInvoiceResponseList: this.array2,
    };

    this.invoiceService.saveInvoiceDetailsByPartner(request).subscribe(
      (res) => {
        this._appService.toastr(`The invoice is submitted successfully`, {
          icon: 'success',
        });
        this.router.navigate(['/invoice/partner-list']);
      },
      (err) => {
        this._appService.toastr(err, { icon: 'error' });
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




  openView(n: WorkEfforts) {
    this._view = true;
    this.ownerInfo = n;
    n.skillOwnerEntityId;
  }

  closeView(): void {
    this._view = false;
  }
}
