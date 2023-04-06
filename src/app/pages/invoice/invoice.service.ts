import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminInvoiceRequest, FileResponse, InvoiceListingData, InvoiceRequest, InvoiceResponse, InvoiceUpdate, TimeSheet } from 'src/app/api/flexcub-api/models';
import { InvoiceDetailResponse } from 'src/app/api/flexcub-api/models/invoice-detail-response';
import { WorkEfforts } from 'src/app/api/flexcub-api/models/work-efforts';
import { OwnerTimeSheetControllerService, SkillOwnerControllerService } from 'src/app/api/flexcub-api/services';
import { InvoiceControllerService } from 'src/app/api/flexcub-api/services/invoice-controller.service';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(
    private readonly invoiceController: InvoiceControllerService,
    private readonly ownerService: SkillOwnerControllerService,
    private readonly ownerTimeSheetControllerService : OwnerTimeSheetControllerService
    ) {}

  getAllInvoiceDetails() {
    return this.invoiceController.getAllInvoiceDetails();
  }

  getAllInvoiceDetailAdmin() {
    return this.invoiceController.getAllInvoiceDetailAdmin();
  }

  getInvoiceStatus() {
    return this.invoiceController.getInvoiceStatus();
  }

  invoiceClientDetails() {
    return this.invoiceController.invoiceClientDetails();
  }

  getAdminInvoiceBySeeker(id: number) {
    return this.invoiceController.getAdminInvoiceBySeeker({ seekerId: id });
  }

  getInvoiceByInvoiceId(
    invoiceId: string,
    isPartner: boolean
  ): Observable<InvoiceDetailResponse> {
    return this.invoiceController.getInvoiceByInvoiceId({
      invoiceId: invoiceId,
      partnerGenerated: isPartner,
    });
  }

  updateInvoiceStatus(invoiceId: string, id: number, comments: string) {
    return this.invoiceController.updateInvoiceStatus({
      invoiceId: invoiceId,
      id: id,
      comments: comments,
    });
  }

  getPartnerInvoiceBySeeker(seekerId: number, projectId: number) {
    return this.invoiceController.getPartnerInvoiceBySeeker({
      seekerId: seekerId,
      projectId: projectId,
    });
  }

  saveInvoiceDetailsByAdmin(req:AdminInvoiceRequest[]) {
    return this.invoiceController.saveInvoiceDetailsByAdmin({ body: req });
  }

 /* partner api*/

  getOwnersByPartners(partnerId: number, startDate: string, endDate: string): Observable<Array<WorkEfforts>> {
    return this.invoiceController.getOwnersByPartners({ partnerId: partnerId, startDate: startDate, endDate: endDate });
  }

  downloadImage(Id: number) {
    return this.ownerService.downloadImage({ id: Id });
  }

  getInvoices(id:number): Observable<Array<InvoiceListingData>> {
    return this.invoiceController.getInvoices({ partnerId: id });
  }

  updateInvoiceDetailsByPartner(body: InvoiceUpdate) {
    return this.invoiceController.updateInvoiceDetailsByPartner({ body: body });
  }

  saveInvoiceDetailsByPartner(invoicerequest: InvoiceRequest): Observable<InvoiceResponse> {
    return this.invoiceController.saveInvoiceDetailsByPartner({ body: invoicerequest });
  }

  getOwnerTimeSheetDetails(id:number):Observable<Array<TimeSheet>>{
    return this.ownerTimeSheetControllerService.getOwnerTimeSheetDetails({skillOwnerId:id});
  }



  /* seeker api*/

  updateSeekerInvoiceStatus(invoiceId:string, id
    :number, comments:string) {
    return this.invoiceController.updateSeekerInvoiceStatus({ invoiceId: invoiceId, statusId: id, comments: comments });
  }


  urlDownloadTimesheetDocuments(id:number):Observable<FileResponse>{
    return this.ownerTimeSheetControllerService.urlDownloadTimesheetDocuments({id:id})
  }

  downloadTimesheetDocuments(id:number):Observable<Blob>{
    return this.ownerTimeSheetControllerService.downloadTimesheetDocuments$Json({id:id})
  }

}
