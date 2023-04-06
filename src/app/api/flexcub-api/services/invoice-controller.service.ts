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

import { AdminInvoice } from '../models/admin-invoice';
import { AdminInvoiceRequest } from '../models/admin-invoice-request';
import { ClientInvoiceDetails } from '../models/client-invoice-details';
import { InvoiceDetailResponse } from '../models/invoice-detail-response';
import { InvoiceDetails } from '../models/invoice-details';
import { InvoiceListingData } from '../models/invoice-listing-data';
import { InvoiceRequest } from '../models/invoice-request';
import { InvoiceResponse } from '../models/invoice-response';
import { InvoiceStatus } from '../models/invoice-status';
import { InvoiceUpdate } from '../models/invoice-update';
import { SeekerInvoice } from '../models/seeker-invoice';
import { SeekerInvoiceStatus } from '../models/seeker-invoice-status';
import { WorkEfforts } from '../models/work-efforts';

@Injectable({
  providedIn: 'root',
})
export class InvoiceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateInvoiceDetailsByPartner
   */
  static readonly UpdateInvoiceDetailsByPartnerPath = '/v1/invoice/updatePartnerInvoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvoiceDetailsByPartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoiceDetailsByPartner$Response(params: {
    context?: HttpContext
    body: InvoiceUpdate
  }
): Observable<StrictHttpResponse<InvoiceUpdate>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.UpdateInvoiceDetailsByPartnerPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceUpdate>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateInvoiceDetailsByPartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoiceDetailsByPartner(params: {
    context?: HttpContext
    body: InvoiceUpdate
  }
): Observable<InvoiceUpdate> {

    return this.updateInvoiceDetailsByPartner$Response(params).pipe(
      map((r: StrictHttpResponse<InvoiceUpdate>) => r.body as InvoiceUpdate)
    );
  }

  /**
   * Path part for operation updateInvoiceStatus
   */
  static readonly UpdateInvoiceStatusPath = '/v1/invoice/updatePartnerInvoiceStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvoiceStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInvoiceStatus$Response(params: {
    invoiceId: string;
    id: number;
    comments?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<InvoiceResponse>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.UpdateInvoiceStatusPath, 'put');
    if (params) {
      rb.query('invoiceId', params.invoiceId, {});
      rb.query('id', params.id, {});
      rb.query('comments', params.comments, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateInvoiceStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateInvoiceStatus(params: {
    invoiceId: string;
    id: number;
    comments?: string;
    context?: HttpContext
  }
): Observable<InvoiceResponse> {

    return this.updateInvoiceStatus$Response(params).pipe(
      map((r: StrictHttpResponse<InvoiceResponse>) => r.body as InvoiceResponse)
    );
  }

  /**
   * Path part for operation updateInvoiceDetailsByAdmin
   */
  static readonly UpdateInvoiceDetailsByAdminPath = '/v1/invoice/updateAdminInvoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateInvoiceDetailsByAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoiceDetailsByAdmin$Response(params: {
    context?: HttpContext
    body: InvoiceUpdate
  }
): Observable<StrictHttpResponse<InvoiceUpdate>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.UpdateInvoiceDetailsByAdminPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceUpdate>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateInvoiceDetailsByAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateInvoiceDetailsByAdmin(params: {
    context?: HttpContext
    body: InvoiceUpdate
  }
): Observable<InvoiceUpdate> {

    return this.updateInvoiceDetailsByAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<InvoiceUpdate>) => r.body as InvoiceUpdate)
    );
  }

  /**
   * Path part for operation updateSeekerInvoiceStatus
   */
  static readonly UpdateSeekerInvoiceStatusPath = '/v1/invoice/updateAdminInvoiceStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSeekerInvoiceStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSeekerInvoiceStatus$Response(params: {
    invoiceId: string;
    statusId: number;
    comments?: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SeekerInvoiceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.UpdateSeekerInvoiceStatusPath, 'put');
    if (params) {
      rb.query('invoiceId', params.invoiceId, {});
      rb.query('statusId', params.statusId, {});
      rb.query('comments', params.comments, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeekerInvoiceStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSeekerInvoiceStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSeekerInvoiceStatus(params: {
    invoiceId: string;
    statusId: number;
    comments?: string;
    context?: HttpContext
  }
): Observable<SeekerInvoiceStatus> {

    return this.updateSeekerInvoiceStatus$Response(params).pipe(
      map((r: StrictHttpResponse<SeekerInvoiceStatus>) => r.body as SeekerInvoiceStatus)
    );
  }

  /**
   * Path part for operation saveInvoiceDetailsByPartner
   */
  static readonly SaveInvoiceDetailsByPartnerPath = '/v1/invoice/savePartnerInvoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInvoiceDetailsByPartner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInvoiceDetailsByPartner$Response(params: {
    context?: HttpContext
    body: InvoiceRequest
  }
): Observable<StrictHttpResponse<InvoiceResponse>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.SaveInvoiceDetailsByPartnerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveInvoiceDetailsByPartner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInvoiceDetailsByPartner(params: {
    context?: HttpContext
    body: InvoiceRequest
  }
): Observable<InvoiceResponse> {

    return this.saveInvoiceDetailsByPartner$Response(params).pipe(
      map((r: StrictHttpResponse<InvoiceResponse>) => r.body as InvoiceResponse)
    );
  }

  /**
   * Path part for operation saveInvoiceDetailsByAdmin
   */
  static readonly SaveInvoiceDetailsByAdminPath = '/v1/invoice/saveAdminInvoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInvoiceDetailsByAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInvoiceDetailsByAdmin$Response(params: {
    context?: HttpContext
    body: Array<AdminInvoiceRequest>
  }
): Observable<StrictHttpResponse<Array<InvoiceResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.SaveInvoiceDetailsByAdminPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveInvoiceDetailsByAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInvoiceDetailsByAdmin(params: {
    context?: HttpContext
    body: Array<AdminInvoiceRequest>
  }
): Observable<Array<InvoiceResponse>> {

    return this.saveInvoiceDetailsByAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceResponse>>) => r.body as Array<InvoiceResponse>)
    );
  }

  /**
   * Path part for operation getInvoices
   */
  static readonly GetInvoicesPath = '/v1/invoice/submittedInvoicesByPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoices$Response(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<InvoiceListingData>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetInvoicesPath, 'get');
    if (params) {
      rb.query('partnerId', params.partnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceListingData>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoices(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<Array<InvoiceListingData>> {

    return this.getInvoices$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceListingData>>) => r.body as Array<InvoiceListingData>)
    );
  }

  /**
   * Path part for operation getInvoiceStatus
   */
  static readonly GetInvoiceStatusPath = '/v1/invoice/invoiceStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoiceStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceStatus$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<InvoiceStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetInvoiceStatusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInvoiceStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceStatus(params?: {
    context?: HttpContext
  }
): Observable<Array<InvoiceStatus>> {

    return this.getInvoiceStatus$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceStatus>>) => r.body as Array<InvoiceStatus>)
    );
  }

  /**
   * Path part for operation getPartnerInvoiceBySeeker
   */
  static readonly GetPartnerInvoiceBySeekerPath = '/v1/invoice/getPartnerInvoiceBySeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPartnerInvoiceBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartnerInvoiceBySeeker$Response(params: {
    seekerId: number;
    projectId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<AdminInvoice>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetPartnerInvoiceBySeekerPath, 'get');
    if (params) {
      rb.query('seekerId', params.seekerId, {});
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AdminInvoice>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPartnerInvoiceBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartnerInvoiceBySeeker(params: {
    seekerId: number;
    projectId: number;
    context?: HttpContext
  }
): Observable<Array<AdminInvoice>> {

    return this.getPartnerInvoiceBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AdminInvoice>>) => r.body as Array<AdminInvoice>)
    );
  }

  /**
   * Path part for operation getOwnersByPartners
   */
  static readonly GetOwnersByPartnersPath = '/v1/invoice/getOwnersByPartnerId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOwnersByPartners()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnersByPartners$Response(params: {
    partnerId: number;
    startDate: string;
    endDate: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<WorkEfforts>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetOwnersByPartnersPath, 'get');
    if (params) {
      rb.query('partnerId', params.partnerId, {});
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WorkEfforts>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOwnersByPartners$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnersByPartners(params: {
    partnerId: number;
    startDate: string;
    endDate: string;
    context?: HttpContext
  }
): Observable<Array<WorkEfforts>> {

    return this.getOwnersByPartners$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WorkEfforts>>) => r.body as Array<WorkEfforts>)
    );
  }

  /**
   * Path part for operation getInvoiceByInvoiceId
   */
  static readonly GetInvoiceByInvoiceIdPath = '/v1/invoice/getInvoiceDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInvoiceByInvoiceId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceByInvoiceId$Response(params: {
    invoiceId: string;
    partnerGenerated: boolean;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<InvoiceDetailResponse>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetInvoiceByInvoiceIdPath, 'get');
    if (params) {
      rb.query('invoiceId', params.invoiceId, {});
      rb.query('partnerGenerated', params.partnerGenerated, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<InvoiceDetailResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInvoiceByInvoiceId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInvoiceByInvoiceId(params: {
    invoiceId: string;
    partnerGenerated: boolean;
    context?: HttpContext
  }
): Observable<InvoiceDetailResponse> {

    return this.getInvoiceByInvoiceId$Response(params).pipe(
      map((r: StrictHttpResponse<InvoiceDetailResponse>) => r.body as InvoiceDetailResponse)
    );
  }

  /**
   * Path part for operation getAllInvoiceDetails
   */
  static readonly GetAllInvoiceDetailsPath = '/v1/invoice/getAllInvoiceDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoiceDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoiceDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<InvoiceDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAllInvoiceDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllInvoiceDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoiceDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<InvoiceDetails>> {

    return this.getAllInvoiceDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceDetails>>) => r.body as Array<InvoiceDetails>)
    );
  }

  /**
   * Path part for operation getAllInvoiceDetailAdmin
   */
  static readonly GetAllInvoiceDetailAdminPath = '/v1/invoice/getAllAdminInvoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllInvoiceDetailAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoiceDetailAdmin$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<InvoiceDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAllInvoiceDetailAdminPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllInvoiceDetailAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllInvoiceDetailAdmin(params?: {
    context?: HttpContext
  }
): Observable<Array<InvoiceDetails>> {

    return this.getAllInvoiceDetailAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceDetails>>) => r.body as Array<InvoiceDetails>)
    );
  }

  /**
   * Path part for operation getAdminInvoiceData
   */
  static readonly GetAdminInvoiceDataPath = '/v1/invoice/getAdminInvoiceforSeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAdminInvoiceData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceData$Response(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerInvoice>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAdminInvoiceDataPath, 'get');
    if (params) {
      rb.query('seekerId', params.seekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerInvoice>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAdminInvoiceData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceData(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<Array<SeekerInvoice>> {

    return this.getAdminInvoiceData$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerInvoice>>) => r.body as Array<SeekerInvoice>)
    );
  }

  /**
   * Path part for operation getAdminInvoiceData1
   */
  static readonly GetAdminInvoiceData1Path = '/v1/invoice/getAdminInvoiceDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAdminInvoiceData1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceData1$Response(params: {
    seekerId: number;
    projectId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<AdminInvoice>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAdminInvoiceData1Path, 'get');
    if (params) {
      rb.query('seekerId', params.seekerId, {});
      rb.query('projectId', params.projectId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AdminInvoice>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAdminInvoiceData1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceData1(params: {
    seekerId: number;
    projectId: number;
    context?: HttpContext
  }
): Observable<Array<AdminInvoice>> {

    return this.getAdminInvoiceData1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AdminInvoice>>) => r.body as Array<AdminInvoice>)
    );
  }

  /**
   * Path part for operation getAdminInvoiceBySeeker
   */
  static readonly GetAdminInvoiceBySeekerPath = '/v1/invoice/getAdminInvoiceBySeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAdminInvoiceBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceBySeeker$Response(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<InvoiceDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.GetAdminInvoiceBySeekerPath, 'get');
    if (params) {
      rb.query('seekerId', params.seekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAdminInvoiceBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminInvoiceBySeeker(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<Array<InvoiceDetails>> {

    return this.getAdminInvoiceBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<Array<InvoiceDetails>>) => r.body as Array<InvoiceDetails>)
    );
  }

  /**
   * Path part for operation invoiceClientDetails
   */
  static readonly InvoiceClientDetailsPath = '/v1/invoice/clientDetailInInvoice';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `invoiceClientDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  invoiceClientDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ClientInvoiceDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, InvoiceControllerService.InvoiceClientDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ClientInvoiceDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `invoiceClientDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  invoiceClientDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<ClientInvoiceDetails>> {

    return this.invoiceClientDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ClientInvoiceDetails>>) => r.body as Array<ClientInvoiceDetails>)
    );
  }

}
