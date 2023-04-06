import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html2canvas from 'html2canvas';
import { filter } from 'rxjs';
import {
  InvoiceDetailResponse,
  Registration,
} from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { InvoiceService } from 'src/app/pages/invoice/invoice.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['./preview-invoice.component.scss'],
})
export class PreviewInvoiceComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;
  user!: Registration;
  invoiceId!: string;
  invoiceDetails: InvoiceDetailResponse[] = [];
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;

  constructor(
    private readonly _invoiceService: InvoiceService,
    private readonly _appService: AppService,
    private activateRoute: ActivatedRoute
  ) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(filter((param: Params) => !!param && !!param?.invoiceId))
      .subscribe((param: Params) => {
        this.invoiceId = param.invoiceId;
        this.getInvoiceDetails(param.invoiceId);
      });
  }

  getInvoiceDetails(id: string) {
    this._invoiceService.getInvoiceByInvoiceId(id, false).subscribe((res) => {
      this.invoiceDetails.push(res);
      this.finalAmt = this.invoiceDetails[0]?.invoiceData?.reduce(
        (n, { amount }: any) => n + amount,
        0
      ) as number;
      this.finalCount = this.invoiceDetails[0]?.invoiceData?.length as number;
      this.finalHours = this.invoiceDetails[0]?.invoiceData?.reduce(
        (n, { totalHours }: any) => n + totalHours,
        0
      ) as number;
    });
  }

  download() {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'invoice.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
