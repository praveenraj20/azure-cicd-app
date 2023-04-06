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
import { SowStatusDto } from '../models/sow-status-dto';
import { StatementOfWork } from '../models/statement-of-work';
import { StatementOfWorkGetDetails } from '../models/statement-of-work-get-details';

@Injectable({
  providedIn: 'root',
})
export class StatementOfWorkControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateFile
   */
  static readonly UpdateFilePath = '/v1/statementOfWorkController/uploadSOW';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateFile$Response(params: {
    ownerId: number;
    skillSeekerId: number;
    domainId: number;
    roles: string;
    skillSeekerProjectId: number;
    jobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<StatementOfWork>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.UpdateFilePath, 'put');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('domainId', params.domainId, {});
      rb.query('roles', params.roles, {});
      rb.query('skillSeekerProjectId', params.skillSeekerProjectId, {});
      rb.query('jobId', params.jobId, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StatementOfWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateFile(params: {
    ownerId: number;
    skillSeekerId: number;
    domainId: number;
    roles: string;
    skillSeekerProjectId: number;
    jobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StatementOfWork> {

    return this.updateFile$Response(params).pipe(
      map((r: StrictHttpResponse<StatementOfWork>) => r.body as StatementOfWork)
    );
  }

  /**
   * Path part for operation uploadFile
   */
  static readonly UploadFilePath = '/v1/statementOfWorkController/uploadSOW';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile$Response(params: {
    ownerId: number;
    skillSeekerId: number;
    domainId: number;
    roles: string;
    skillSeekerProjectId: number;
    jobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<StatementOfWork>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.UploadFilePath, 'post');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('domainId', params.domainId, {});
      rb.query('roles', params.roles, {});
      rb.query('skillSeekerProjectId', params.skillSeekerProjectId, {});
      rb.query('jobId', params.jobId, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StatementOfWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile(params: {
    ownerId: number;
    skillSeekerId: number;
    domainId: number;
    roles: string;
    skillSeekerProjectId: number;
    jobId: string;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StatementOfWork> {

    return this.uploadFile$Response(params).pipe(
      map((r: StrictHttpResponse<StatementOfWork>) => r.body as StatementOfWork)
    );
  }

  /**
   * Path part for operation updateSowStatus
   */
  static readonly UpdateSowStatusPath = '/v1/statementOfWorkController/updateSowStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSowStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSowStatus$Response(params: {
    sowId: number;
    sowStatusId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SowStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.UpdateSowStatusPath, 'put');
    if (params) {
      rb.query('sowId', params.sowId, {});
      rb.query('sowStatusId', params.sowStatusId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SowStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSowStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSowStatus(params: {
    sowId: number;
    sowStatusId: number;
    context?: HttpContext
  }
): Observable<SowStatusDto> {

    return this.updateSowStatus$Response(params).pipe(
      map((r: StrictHttpResponse<SowStatusDto>) => r.body as SowStatusDto)
    );
  }

  /**
   * Path part for operation getSowTemplate
   */
  static readonly GetSowTemplatePath = '/v1/statementOfWorkController/getSowTemplate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSowTemplate$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowTemplate$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.GetSowTemplatePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getSowTemplate$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowTemplate$Json(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getSowTemplate$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSowTemplate$Pdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowTemplate$Pdf$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.GetSowTemplatePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getSowTemplate$Pdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowTemplate$Pdf(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getSowTemplate$Pdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getSowDetails
   */
  static readonly GetSowDetailsPath = '/v1/statementOfWorkController/getSowDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSowDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowDetails$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<StatementOfWorkGetDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.GetSowDetailsPath, 'get');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatementOfWorkGetDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSowDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSowDetails(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<StatementOfWorkGetDetails>> {

    return this.getSowDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatementOfWorkGetDetails>>) => r.body as Array<StatementOfWorkGetDetails>)
    );
  }

  /**
   * Path part for operation getAllSowDetails
   */
  static readonly GetAllSowDetailsPath = '/v1/statementOfWorkController/getAllSowDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSowDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSowDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<StatementOfWorkGetDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.GetAllSowDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatementOfWorkGetDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllSowDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSowDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<StatementOfWorkGetDetails>> {

    return this.getAllSowDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatementOfWorkGetDetails>>) => r.body as Array<StatementOfWorkGetDetails>)
    );
  }

  /**
   * Path part for operation downloadAgreementSow
   */
  static readonly DownloadAgreementSowPath = '/v1/statementOfWorkController/downloadOwnerAgreementForSow';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreementSow$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementSow$Json$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.DownloadAgreementSowPath, 'get');
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
   * To access the full response (for headers, for example), `downloadAgreementSow$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementSow$Json(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadAgreementSow$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreementSow$Pdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementSow$Pdf$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.DownloadAgreementSowPath, 'get');
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
   * To access the full response (for headers, for example), `downloadAgreementSow$Pdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreementSow$Pdf(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadAgreementSow$Pdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadOwnerAgreement
   */
  static readonly DownloadOwnerAgreementPath = '/v1/statementOfWorkController/downloadAgreementForSow';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadOwnerAgreement()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOwnerAgreement$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, StatementOfWorkControllerService.DownloadOwnerAgreementPath, 'get');
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
   * To access the full response (for headers, for example), `downloadOwnerAgreement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOwnerAgreement(params: {
    id: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadOwnerAgreement$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

}
