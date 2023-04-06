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

import { HiringPriority } from '../models/hiring-priority';
import { JobDto } from '../models/job-dto';

@Injectable({
  providedIn: 'root',
})
export class JobControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addJobDetails
   */
  static readonly AddJobDetailsPath = '/v1/jobCreation/createJob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addJobDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJobDetails$Response(params: {
    context?: HttpContext
    body: JobDto
  }
): Observable<StrictHttpResponse<JobDto>> {

    const rb = new RequestBuilder(this.rootUrl, JobControllerService.AddJobDetailsPath, 'post');
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
   * To access the full response (for headers, for example), `addJobDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addJobDetails(params: {
    context?: HttpContext
    body: JobDto
  }
): Observable<JobDto> {

    return this.addJobDetails$Response(params).pipe(
      map((r: StrictHttpResponse<JobDto>) => r.body as JobDto)
    );
  }

  /**
   * Path part for operation getJobDetails
   */
  static readonly GetJobDetailsPath = '/v1/jobCreation/retrieveJob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobDetails$Response(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<JobDto>>> {

    const rb = new RequestBuilder(this.rootUrl, JobControllerService.GetJobDetailsPath, 'get');
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
        return r as StrictHttpResponse<Array<JobDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJobDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobDetails(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<Array<JobDto>> {

    return this.getJobDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JobDto>>) => r.body as Array<JobDto>)
    );
  }

  /**
   * Path part for operation publish
   */
  static readonly PublishPath = '/v1/jobCreation/publish';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `publish()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish$Response(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<JobDto>> {

    const rb = new RequestBuilder(this.rootUrl, JobControllerService.PublishPath, 'get');
    if (params) {
      rb.query('jobId', params.jobId, {});
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
   * To access the full response (for headers, for example), `publish$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<JobDto> {

    return this.publish$Response(params).pipe(
      map((r: StrictHttpResponse<JobDto>) => r.body as JobDto)
    );
  }

  /**
   * Path part for operation getHiringPriority
   */
  static readonly GetHiringPriorityPath = '/v1/jobCreation/hiringPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHiringPriority()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHiringPriority$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<HiringPriority>>> {

    const rb = new RequestBuilder(this.rootUrl, JobControllerService.GetHiringPriorityPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<HiringPriority>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHiringPriority$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHiringPriority(params?: {
    context?: HttpContext
  }
): Observable<Array<HiringPriority>> {

    return this.getHiringPriority$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HiringPriority>>) => r.body as Array<HiringPriority>)
    );
  }

  /**
   * Path part for operation deleteJob
   */
  static readonly DeleteJobPath = '/v1/jobCreation/deleteJob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteJob()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob$Response(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, JobControllerService.DeleteJobPath, 'delete');
    if (params) {
      rb.query('jobId', params.jobId, {});
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
   * To access the full response (for headers, for example), `deleteJob$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteJob(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteJob$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
