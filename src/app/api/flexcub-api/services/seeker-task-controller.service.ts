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

import { SkillSeekerTask } from '../models/skill-seeker-task';

@Injectable({
  providedIn: 'root',
})
export class SeekerTaskControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateSeekerTaskDetails
   */
  static readonly UpdateSeekerTaskDetailsPath = '/v1/skillseekerTask/updateTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSeekerTaskDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerTaskDetails$Response(params: {
    context?: HttpContext
    body: SkillSeekerTask
  }
): Observable<StrictHttpResponse<SkillSeekerTask>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTaskControllerService.UpdateSeekerTaskDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillSeekerTask>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSeekerTaskDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerTaskDetails(params: {
    context?: HttpContext
    body: SkillSeekerTask
  }
): Observable<SkillSeekerTask> {

    return this.updateSeekerTaskDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeekerTask>) => r.body as SkillSeekerTask)
    );
  }

  /**
   * Path part for operation insertSeekerTaskDetails
   */
  static readonly InsertSeekerTaskDetailsPath = '/v1/skillseekerTask/insertTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertSeekerTaskDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSeekerTaskDetails$Response(params: {
    context?: HttpContext
    body: Array<SkillSeekerTask>
  }
): Observable<StrictHttpResponse<Array<SkillSeekerTask>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTaskControllerService.InsertSeekerTaskDetailsPath, 'post');
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
        return r as StrictHttpResponse<Array<SkillSeekerTask>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertSeekerTaskDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSeekerTaskDetails(params: {
    context?: HttpContext
    body: Array<SkillSeekerTask>
  }
): Observable<Array<SkillSeekerTask>> {

    return this.insertSeekerTaskDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerTask>>) => r.body as Array<SkillSeekerTask>)
    );
  }

  /**
   * Path part for operation seekerTaskDetails
   */
  static readonly SeekerTaskDetailsPath = '/v1/skillseekerTask/getTaskData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seekerTaskDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerTaskDetails$Response(params: {
    projectId: number;
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillSeekerTask>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTaskControllerService.SeekerTaskDetailsPath, 'get');
    if (params) {
      rb.query('projectId', params.projectId, {});
      rb.query('skillSeekerId', params.skillSeekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillSeekerTask>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seekerTaskDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerTaskDetails(params: {
    projectId: number;
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<SkillSeekerTask>> {

    return this.seekerTaskDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerTask>>) => r.body as Array<SkillSeekerTask>)
    );
  }

  /**
   * Path part for operation deleteSeekerTaskDetails
   */
  static readonly DeleteSeekerTaskDetailsPath = '/v1/skillseekerTask/deleteTask';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSeekerTaskDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerTaskDetails$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTaskControllerService.DeleteSeekerTaskDetailsPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSeekerTaskDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerTaskDetails(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSeekerTaskDetails$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
