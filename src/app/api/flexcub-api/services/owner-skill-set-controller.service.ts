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

import { SkillOwnerSkillSet } from '../models/skill-owner-skill-set';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillSetControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateDetails
   */
  static readonly UpdateDetailsPath = '/v1/OwnerSkillSet/updateSkillSet';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetails$Response(params: {
    context?: HttpContext
    body: SkillOwnerSkillSet
  }
): Observable<StrictHttpResponse<SkillOwnerSkillSet>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillSetControllerService.UpdateDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillOwnerSkillSet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetails(params: {
    context?: HttpContext
    body: SkillOwnerSkillSet
  }
): Observable<SkillOwnerSkillSet> {

    return this.updateDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerSkillSet>) => r.body as SkillOwnerSkillSet)
    );
  }

  /**
   * Path part for operation insertDetails1
   */
  static readonly InsertDetails1Path = '/v1/OwnerSkillSet/insertSkillset';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertDetails1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails1$Response(params: {
    context?: HttpContext
    body: SkillOwnerSkillSet
  }
): Observable<StrictHttpResponse<SkillOwnerSkillSet>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillSetControllerService.InsertDetails1Path, 'post');
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
        return r as StrictHttpResponse<SkillOwnerSkillSet>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertDetails1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails1(params: {
    context?: HttpContext
    body: SkillOwnerSkillSet
  }
): Observable<SkillOwnerSkillSet> {

    return this.insertDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerSkillSet>) => r.body as SkillOwnerSkillSet)
    );
  }

  /**
   * Path part for operation getDetails
   */
  static readonly GetDetailsPath = '/v1/OwnerSkillSet/getSkillSet';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails$Response(params: {
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillOwnerSkillSet>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillSetControllerService.GetDetailsPath, 'get');
    if (params) {
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillOwnerSkillSet>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails(params: {
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<Array<SkillOwnerSkillSet>> {

    return this.getDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillOwnerSkillSet>>) => r.body as Array<SkillOwnerSkillSet>)
    );
  }

  /**
   * Path part for operation deleteDetails
   */
  static readonly DeleteDetailsPath = '/v1/OwnerSkillSet/deleteDataset';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDetails$Response(params: {
    skillId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillSetControllerService.DeleteDetailsPath, 'delete');
    if (params) {
      rb.query('skillId', params.skillId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDetails(params: {
    skillId: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteDetails$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
