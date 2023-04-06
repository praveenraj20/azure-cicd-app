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

import { OwnerSkillStatus } from '../models/owner-skill-status';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateOwnerDetails
   */
  static readonly UpdateOwnerDetailsPath = '/v1/OwnerSkillStatus/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOwnerDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerDetails$Response(params: {
    context?: HttpContext
    body: OwnerSkillStatus
  }
): Observable<StrictHttpResponse<OwnerSkillStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillStatusControllerService.UpdateOwnerDetailsPath, 'put');
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
        return r as StrictHttpResponse<OwnerSkillStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateOwnerDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerDetails(params: {
    context?: HttpContext
    body: OwnerSkillStatus
  }
): Observable<OwnerSkillStatus> {

    return this.updateOwnerDetails$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerSkillStatus>) => r.body as OwnerSkillStatus)
    );
  }

  /**
   * Path part for operation insertDetailsStatus
   */
  static readonly InsertDetailsStatusPath = '/v1/OwnerSkillStatus/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertDetailsStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetailsStatus$Response(params: {
    context?: HttpContext
    body: OwnerSkillStatus
  }
): Observable<StrictHttpResponse<OwnerSkillStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillStatusControllerService.InsertDetailsStatusPath, 'post');
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
        return r as StrictHttpResponse<OwnerSkillStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertDetailsStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetailsStatus(params: {
    context?: HttpContext
    body: OwnerSkillStatus
  }
): Observable<OwnerSkillStatus> {

    return this.insertDetailsStatus$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerSkillStatus>) => r.body as OwnerSkillStatus)
    );
  }

  /**
   * Path part for operation getDetailsStatus
   */
  static readonly GetDetailsStatusPath = '/v1/OwnerSkillStatus/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailsStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsStatus$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerSkillStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillStatusControllerService.GetDetailsStatusPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerSkillStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetailsStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsStatus(params?: {
    context?: HttpContext
  }
): Observable<Array<OwnerSkillStatus>> {

    return this.getDetailsStatus$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerSkillStatus>>) => r.body as Array<OwnerSkillStatus>)
    );
  }

}
