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

import { JobDto } from '../models/job-dto';
import { SeekerRequirement } from '../models/seeker-requirement';

@Injectable({
  providedIn: 'root',
})
export class SeekerRequirementControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateRequirementDetailsData
   */
  static readonly UpdateRequirementDetailsDataPath = '/v1/SeekerRequirementController/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRequirementDetailsData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRequirementDetailsData$Response(params: {
    context?: HttpContext
    body: SeekerRequirement
  }
): Observable<StrictHttpResponse<JobDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerRequirementControllerService.UpdateRequirementDetailsDataPath, 'put');
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
        return r as StrictHttpResponse<JobDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRequirementDetailsData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRequirementDetailsData(params: {
    context?: HttpContext
    body: SeekerRequirement
  }
): Observable<JobDto> {

    return this.updateRequirementDetailsData$Response(params).pipe(
      map((r: StrictHttpResponse<JobDto>) => r.body as JobDto)
    );
  }

  /**
   * Path part for operation insertRequirementDetailsData
   */
  static readonly InsertRequirementDetailsDataPath = '/v1/SeekerRequirementController/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertRequirementDetailsData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertRequirementDetailsData$Response(params: {
    context?: HttpContext
    body: Array<SeekerRequirement>
  }
): Observable<StrictHttpResponse<Array<JobDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerRequirementControllerService.InsertRequirementDetailsDataPath, 'post');
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
        return r as StrictHttpResponse<Array<JobDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertRequirementDetailsData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertRequirementDetailsData(params: {
    context?: HttpContext
    body: Array<SeekerRequirement>
  }
): Observable<Array<JobDto>> {

    return this.insertRequirementDetailsData$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JobDto>>) => r.body as Array<JobDto>)
    );
  }

  /**
   * Path part for operation getRequirementDetails
   */
  static readonly GetRequirementDetailsPath = '/v1/SeekerRequirementController/getRequirementData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRequirementDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRequirementDetails$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerRequirement>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerRequirementControllerService.GetRequirementDetailsPath, 'get');
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
        return r as StrictHttpResponse<Array<SeekerRequirement>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getRequirementDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRequirementDetails(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<SeekerRequirement>> {

    return this.getRequirementDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerRequirement>>) => r.body as Array<SeekerRequirement>)
    );
  }

  /**
   * Path part for operation deleteData1
   */
  static readonly DeleteData1Path = '/v1/SeekerRequirementController/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteData1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData1$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerRequirementControllerService.DeleteData1Path, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteData1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData1(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteData1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
