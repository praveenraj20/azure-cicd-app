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

import { OwnerSkillDomain } from '../models/owner-skill-domain';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillDomainControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateDetails1
   */
  static readonly UpdateDetails1Path = '/v1/OwnerSkillDomain/updateSkillSet';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDetails1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetails1$Response(params: {
    context?: HttpContext
    body: OwnerSkillDomain
  }
): Observable<StrictHttpResponse<OwnerSkillDomain>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillDomainControllerService.UpdateDetails1Path, 'put');
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
        return r as StrictHttpResponse<OwnerSkillDomain>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDetails1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetails1(params: {
    context?: HttpContext
    body: OwnerSkillDomain
  }
): Observable<OwnerSkillDomain> {

    return this.updateDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerSkillDomain>) => r.body as OwnerSkillDomain)
    );
  }

  /**
   * Path part for operation insertDetails2
   */
  static readonly InsertDetails2Path = '/v1/OwnerSkillDomain/insertDomainDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertDetails2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails2$Response(params: {
    context?: HttpContext
    body: OwnerSkillDomain
  }
): Observable<StrictHttpResponse<OwnerSkillDomain>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillDomainControllerService.InsertDetails2Path, 'post');
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
        return r as StrictHttpResponse<OwnerSkillDomain>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertDetails2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails2(params: {
    context?: HttpContext
    body: OwnerSkillDomain
  }
): Observable<OwnerSkillDomain> {

    return this.insertDetails2$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerSkillDomain>) => r.body as OwnerSkillDomain)
    );
  }

  /**
   * Path part for operation getDetails2
   */
  static readonly GetDetails2Path = '/v1/OwnerSkillDomain/getDomainDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetails2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails2$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerSkillDomain>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillDomainControllerService.GetDetails2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerSkillDomain>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetails2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails2(params?: {
    context?: HttpContext
  }
): Observable<Array<OwnerSkillDomain>> {

    return this.getDetails2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerSkillDomain>>) => r.body as Array<OwnerSkillDomain>)
    );
  }

}
