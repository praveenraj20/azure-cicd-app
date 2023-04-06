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

import { ContractStatus } from '../models/contract-status';
import { FileResponse } from '../models/file-response';
import { MsaStatusDto } from '../models/msa-status-dto';
import { SeekerAdminMsa } from '../models/seeker-admin-msa';
import { SkillSeekerMsaDto } from '../models/skill-seeker-msa-dto';

@Injectable({
  providedIn: 'root',
})
export class SeekerMsaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateMsaStatus
   */
  static readonly UpdateMsaStatusPath = '/v1/skillSeekerMSAController/msaStatusUpdate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMsaStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMsaStatus$Response(params: {
    msaId: number;
    msaStatusId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<MsaStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.UpdateMsaStatusPath, 'put');
    if (params) {
      rb.query('msaId', params.msaId, {});
      rb.query('msaStatusId', params.msaStatusId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MsaStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateMsaStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateMsaStatus(params: {
    msaId: number;
    msaStatusId: number;
    context?: HttpContext
  }
): Observable<MsaStatusDto> {

    return this.updateMsaStatus$Response(params).pipe(
      map((r: StrictHttpResponse<MsaStatusDto>) => r.body as MsaStatusDto)
    );
  }

  /**
   * Path part for operation uploadFile1
   */
  static readonly UploadFile1Path = '/v1/skillSeekerMSAController/uploadMSA';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile1()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile1$Response(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    jobId: string;
    ownerId: number;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<SkillSeekerMsaDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.UploadFile1Path, 'post');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('skillSeekerProjectId', params.skillSeekerProjectId, {});
      rb.query('jobId', params.jobId, {});
      rb.query('ownerId', params.ownerId, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SkillSeekerMsaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFile1$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile1(params: {
    skillSeekerId: number;
    skillSeekerProjectId: number;
    jobId: string;
    ownerId: number;
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<SkillSeekerMsaDto> {

    return this.uploadFile1$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeekerMsaDto>) => r.body as SkillSeekerMsaDto)
    );
  }

  /**
   * Path part for operation getSkillSeekerMsaTemplate
   */
  static readonly GetSkillSeekerMsaTemplatePath = '/v1/skillSeekerMSAController/getSkillSeekerMsaTemplate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSkillSeekerMsaTemplate$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillSeekerMsaTemplate$Json$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.GetSkillSeekerMsaTemplatePath, 'get');
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
   * To access the full response (for headers, for example), `getSkillSeekerMsaTemplate$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillSeekerMsaTemplate$Json(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getSkillSeekerMsaTemplate$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSkillSeekerMsaTemplate$Pdf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillSeekerMsaTemplate$Pdf$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.GetSkillSeekerMsaTemplatePath, 'get');
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
   * To access the full response (for headers, for example), `getSkillSeekerMsaTemplate$Pdf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillSeekerMsaTemplate$Pdf(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.getSkillSeekerMsaTemplate$Pdf$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation getMsaDetails
   */
  static readonly GetMsaDetailsPath = '/v1/skillSeekerMSAController/getMsaDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMsaDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsaDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerAdminMsa>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.GetMsaDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerAdminMsa>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMsaDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsaDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<SeekerAdminMsa>> {

    return this.getMsaDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerAdminMsa>>) => r.body as Array<SeekerAdminMsa>)
    );
  }

  /**
   * Path part for operation getMsaDetailsBySeeker
   */
  static readonly GetMsaDetailsBySeekerPath = '/v1/skillSeekerMSAController/getMsaDetailsBySeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMsaDetailsBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsaDetailsBySeeker$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerAdminMsa>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.GetMsaDetailsBySeekerPath, 'get');
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
        return r as StrictHttpResponse<Array<SeekerAdminMsa>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMsaDetailsBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsaDetailsBySeeker(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<SeekerAdminMsa>> {

    return this.getMsaDetailsBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerAdminMsa>>) => r.body as Array<SeekerAdminMsa>)
    );
  }

  /**
   * Path part for operation downloadAgreement
   */
  static readonly DownloadAgreementPath = '/v1/skillSeekerMSAController/downloadOwnerAgreement';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadAgreement()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.DownloadAgreementPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'multipart/form-data',
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
   * To access the full response (for headers, for example), `downloadAgreement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadAgreement(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadAgreement$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadOwnerAgreement1
   */
  static readonly DownloadOwnerAgreement1Path = '/v1/skillSeekerMSAController/downloadAgreement';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadOwnerAgreement1()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOwnerAgreement1$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.DownloadOwnerAgreement1Path, 'get');
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
   * To access the full response (for headers, for example), `downloadOwnerAgreement1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOwnerAgreement1(params: {
    id: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadOwnerAgreement1$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

  /**
   * Path part for operation getContractStatus
   */
  static readonly GetContractStatusPath = '/v1/skillSeekerMSAController/contractStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractStatus$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ContractStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerMsaControllerService.GetContractStatusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ContractStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getContractStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractStatus(params?: {
    context?: HttpContext
  }
): Observable<Array<ContractStatus>> {

    return this.getContractStatus$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContractStatus>>) => r.body as Array<ContractStatus>)
    );
  }

}
