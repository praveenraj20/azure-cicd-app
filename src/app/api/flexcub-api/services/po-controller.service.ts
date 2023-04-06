/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FileResponse } from '../models/file-response';
import { PurchaseOrder } from '../models/purchase-order';
import { SeekerPurchaseOrder } from '../models/seeker-purchase-order';

@Injectable({
  providedIn: 'root',
})
export class PoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateFile1
   */
  static readonly UpdateFile1Path = '/v1/purchaseOrder/uploadPO';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFile1()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateFile1$Response(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    skillOwnerId: number;
    Role: string;
    Domain: number;
    JobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<PurchaseOrder>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.UpdateFile1Path, 'put');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('skillSeekerProjectId', params.skillSeekerProjectId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
      rb.query('Role', params.Role, {});
      rb.query('Domain', params.Domain, {});
      rb.query('JobId', params.JobId, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseOrder>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateFile1$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateFile1(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    skillOwnerId: number;
    Role: string;
    Domain: number;
    JobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<PurchaseOrder> {

    return this.updateFile1$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseOrder>) => r.body as PurchaseOrder)
    );
  }

  /**
   * Path part for operation uploadFile2
   */
  static readonly UploadFile2Path = '/v1/purchaseOrder/uploadPO';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile2()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile2$Response(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    skillOwnerId: number;
    Role: string;
    Domain: number;
    JobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<PurchaseOrder>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.UploadFile2Path, 'post');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('skillSeekerProjectId', params.skillSeekerProjectId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
      rb.query('Role', params.Role, {});
      rb.query('Domain', params.Domain, {});
      rb.query('JobId', params.JobId, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseOrder>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFile2$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile2(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    skillOwnerId: number;
    Role: string;
    Domain: number;
    JobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<PurchaseOrder> {

    return this.uploadFile2$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseOrder>) => r.body as PurchaseOrder)
    );
  }

  /**
   * Path part for operation updatePoStatus
   */
  static readonly UpdatePoStatusPath = '/v1/purchaseOrder/updateStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePoStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePoStatus$Response(params: {
    id: number;
    status: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PurchaseOrder>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.UpdatePoStatusPath, 'put');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('status', params.status, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PurchaseOrder>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePoStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePoStatus(params: {
    id: number;
    status: number;
    context?: HttpContext
  }
): Observable<PurchaseOrder> {

    return this.updatePoStatus$Response(params).pipe(
      map((r: StrictHttpResponse<PurchaseOrder>) => r.body as PurchaseOrder)
    );
  }

  /**
   * Path part for operation getPoDetails
   */
  static readonly GetPoDetailsPath = '/v1/purchaseOrder/getPurchaseOrder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPoDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPoDetails$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerPurchaseOrder>>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.GetPoDetailsPath, 'get');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerPurchaseOrder>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPoDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPoDetails(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<SeekerPurchaseOrder>> {

    return this.getPoDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerPurchaseOrder>>) => r.body as Array<SeekerPurchaseOrder>)
    );
  }

  /**
   * Path part for operation getProductOwnerTemplate
   */
  static readonly GetProductOwnerTemplatePath = '/v1/purchaseOrder/getPurchaseOrderTemplate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductOwnerTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductOwnerTemplate$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.GetProductOwnerTemplatePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'APPLICATION/PDF',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProductOwnerTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductOwnerTemplate(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getProductOwnerTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getAllPoDetails
   */
  static readonly GetAllPoDetailsPath = '/v1/purchaseOrder/getAllPurchaseOrder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPoDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPoDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerPurchaseOrder>>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.GetAllPoDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerPurchaseOrder>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllPoDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPoDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<SeekerPurchaseOrder>> {

    return this.getAllPoDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerPurchaseOrder>>) => r.body as Array<SeekerPurchaseOrder>)
    );
  }

  /**
   * Path part for operation downloadAgreement1
   */
  static readonly DownloadAgreement1Path = '/v1/purchaseOrder/downloadOwnerAgreementPO';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreement1$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement1$Json$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.DownloadAgreement1Path, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadAgreement1$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement1$Json(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadAgreement1$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreement1$Pdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement1$Pdf$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.DownloadAgreement1Path, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/pdf',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadAgreement1$Pdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement1$Pdf(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadAgreement1$Pdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadAgreementPo
   */
  static readonly DownloadAgreementPoPath = '/v1/purchaseOrder/downloadAgreementPO';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreementPo()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementPo$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PoControllerService.DownloadAgreementPoPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadAgreementPo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementPo(params: {
    id: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadAgreementPo$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

}
