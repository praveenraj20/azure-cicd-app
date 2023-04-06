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

import { PartnerAdmin } from '../models/partner-admin';
import { SeekerAdmin } from '../models/seeker-admin';
import { SeekerStatusUpdate } from '../models/seeker-status-update';
import { SkillSeeker } from '../models/skill-seeker';
import { TimeSheetResponse } from '../models/time-sheet-response';

@Injectable({
  providedIn: 'root',
})
export class SeekerAdminControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateSeekerStatus
   */
  static readonly UpdateSeekerStatusPath = '/v1/SeekerAdminController/updateSeekerStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSeekerStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerStatus$Response(params: {
    context?: HttpContext
    body: SeekerStatusUpdate
  }
): Observable<StrictHttpResponse<SeekerStatusUpdate>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.UpdateSeekerStatusPath, 'put');
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
        return r as StrictHttpResponse<SeekerStatusUpdate>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSeekerStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerStatus(params: {
    context?: HttpContext
    body: SeekerStatusUpdate
  }
): Observable<SeekerStatusUpdate> {

    return this.updateSeekerStatus$Response(params).pipe(
      map((r: StrictHttpResponse<SeekerStatusUpdate>) => r.body as SeekerStatusUpdate)
    );
  }

  /**
   * Path part for operation updateClientDetails1
   */
  static readonly UpdateClientDetails1Path = '/v1/SeekerAdminController/updateClientInfo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClientDetails1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClientDetails1$Response(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<StrictHttpResponse<SkillSeeker>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.UpdateClientDetails1Path, 'put');
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
        return r as StrictHttpResponse<SkillSeeker>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClientDetails1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClientDetails1(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<SkillSeeker> {

    return this.updateClientDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeeker>) => r.body as SkillSeeker)
    );
  }

  /**
   * Path part for operation addClientDetails
   */
  static readonly AddClientDetailsPath = '/v1/SeekerAdminController/addClientInfo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addClientDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addClientDetails$Response(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<StrictHttpResponse<SkillSeeker>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.AddClientDetailsPath, 'post');
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
        return r as StrictHttpResponse<SkillSeeker>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addClientDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addClientDetails(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<SkillSeeker> {

    return this.addClientDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeeker>) => r.body as SkillSeeker)
    );
  }

  /**
   * Path part for operation skillSeekerByAdmin
   */
  static readonly SkillSeekerByAdminPath = '/v1/SeekerAdminController/skillSeekerByAdmin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `skillSeekerByAdmin()` instead.
   *
   * This method doesn't expect any request body.
   */
  skillSeekerByAdmin$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerAdmin>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.SkillSeekerByAdminPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerAdmin>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `skillSeekerByAdmin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  skillSeekerByAdmin(params?: {
    context?: HttpContext
  }
): Observable<Array<SeekerAdmin>> {

    return this.skillSeekerByAdmin$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerAdmin>>) => r.body as Array<SeekerAdmin>)
    );
  }

  /**
   * Path part for operation skillSeekerBasicDetail
   */
  static readonly SkillSeekerBasicDetailPath = '/v1/SeekerAdminController/skillSeekerBasicDetail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `skillSeekerBasicDetail()` instead.
   *
   * This method doesn't expect any request body.
   */
  skillSeekerBasicDetail$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillSeeker>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.SkillSeekerBasicDetailPath, 'get');
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
        return r as StrictHttpResponse<SkillSeeker>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `skillSeekerBasicDetail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  skillSeekerBasicDetail(params: {
    id: number;
    context?: HttpContext
  }
): Observable<SkillSeeker> {

    return this.skillSeekerBasicDetail$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeeker>) => r.body as SkillSeeker)
    );
  }

  /**
   * Path part for operation getAllSkillPartner
   */
  static readonly GetAllSkillPartnerPath = '/v1/SeekerAdminController/getAllSkillPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSkillPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSkillPartner$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PartnerAdmin>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.GetAllSkillPartnerPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PartnerAdmin>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllSkillPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSkillPartner(params?: {
    context?: HttpContext
  }
): Observable<Array<PartnerAdmin>> {

    return this.getAllSkillPartner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PartnerAdmin>>) => r.body as Array<PartnerAdmin>)
    );
  }

  /**
   * Path part for operation timeSheets
   */
  static readonly TimeSheetsPath = '/v1/SeekerAdminController/GetTimeSheet';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `timeSheets()` instead.
   *
   * This method doesn't expect any request body.
   */
  timeSheets$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<TimeSheetResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerAdminControllerService.TimeSheetsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TimeSheetResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `timeSheets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  timeSheets(params?: {
    context?: HttpContext
  }
): Observable<Array<TimeSheetResponse>> {

    return this.timeSheets$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TimeSheetResponse>>) => r.body as Array<TimeSheetResponse>)
    );
  }

}
