import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html2canvas from 'html2canvas';
import { filter } from 'rxjs';
import { FileResponse, InvoiceDetailResponse, WorkEfforts } from 'src/app/api/flexcub-api/models';
import { InvoiceService } from '../../invoice.service';


@Component({
  selector: 'app-preview-admin',
  templateUrl: './preview-admin.component.html',
  styleUrls: ['./preview-admin.component.scss']
})
export class PreviewAdminComponent implements OnInit {
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;
  invoiceId!: number;
  invoiceDetails:InvoiceDetailResponse[]=[]
  finalAmt!: number;
  finalHours!: number;
  finalCount!: number;
  _serviceFeeAmount!:number;
  amountPayable!:number;
  _client:WorkEfforts[]=[];
  _view:boolean=false;
  ownerId!:number;
  webkitRelativePath1:string='';
  selecteddate!: Date
  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly _service: InvoiceService,
    private readonly datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams
      .pipe(filter((param: Params) => !!param && !!param?.invoiceId && !!param?.isSkillPartner))
      .subscribe((param: Params) => {
        this.invoiceId = param.invoiceId;
        this.getInvoiceDetails(param.invoiceId, param.isSkillPartner);
      });
  }


  getInvoiceDetails(id: string,isSp:boolean) {
    this._service.getInvoiceByInvoiceId(id, isSp).subscribe((res) => {
      this.invoiceDetails[0]=res
      const dateObject = this.datePipe.transform(this.invoiceDetails[0].startDate, 'YYYY-MM-dd') as string;
      this.selecteddate= new Date(Date.parse(dateObject));
      this.finalAmt = this.invoiceDetails[0]?.invoiceData?.reduce((n, { amount }: any) => n + amount, 0) as number;
      this.finalCount = this.invoiceDetails[0]?.invoiceData?.length as number;
      this.finalHours = this.invoiceDetails[0]?.invoiceData?.reduce((n, { totalHours }: any) => n + totalHours, 0) as number;
      this._serviceFeeAmount=this.invoiceDetails[0]?.invoiceData?.reduce((n, { serviceFeesAmount }:any) => n + serviceFeesAmount, 0) as number;
      this.amountPayable = this.finalAmt - this._serviceFeeAmount
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

  openView(n:number ){
    this._view = true;
    this.ownerId=n;
  }

  urlDownloadTimesheetDocuments(id:number){
    if(id){
    this._service.urlDownloadTimesheetDocuments(id).subscribe(
      (data:FileResponse)=>{
    this.webkitRelativePath1 = data?.fileDownloadUri as string

      },
      (error) => {
        this.webkitRelativePath1 ='';
      }
    );
    }

  }

  closeView(): void {
    this._view = false;
  }



}
