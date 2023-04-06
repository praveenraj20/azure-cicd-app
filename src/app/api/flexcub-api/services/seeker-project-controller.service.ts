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

import { SkillSeekerProject } from '../models/skill-seeker-project';

@Injectable({
  providedIn: 'root',
})
export class SeekerProjectControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateSeekerProjectDetails
   */
  static readonly UpdateSeekerProjectDetailsPath = '/v1/skillseekerProject/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSeekerProjectDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerProjectDetails$Response(params: {
    context?: HttpContext
    body: SkillSeekerProject
  }
): Observable<StrictHttpResponse<SkillSeekerProject>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerProjectControllerService.UpdateSeekerProjectDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillSeekerProject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSeekerProjectDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerProjectDetails(params: {
    context?: HttpContext
    body: SkillSeekerProject
  }
): Observable<SkillSeekerProject> {

    return this.updateSeekerProjectDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeekerProject>) => r.body as SkillSeekerProject)
    );
  }

  /**
   * Path part for operation insertSeekerProjectDetails
   */
  static readonly InsertSeekerProjectDetailsPath = '/v1/skillseekerProject/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertSeekerProjectDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSeekerProjectDetails$Response(params: {
    context?: HttpContext
    body: Array<SkillSeekerProject>
  }
): Observable<StrictHttpResponse<Array<SkillSeekerProject>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerProjectControllerService.InsertSeekerProjectDetailsPath, 'post');
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
        return r as StrictHttpResponse<Array<SkillSeekerProject>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertSeekerProjectDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSeekerProjectDetails(params: {
    context?: HttpContext
    body: Array<SkillSeekerProject>
  }
): Observable<Array<SkillSeekerProject>> {

    return this.insertSeekerProjectDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerProject>>) => r.body as Array<SkillSeekerProject>)
    );
  }

  /**
   * Path part for operation seekerProjectDetails
   */
  static readonly SeekerProjectDetailsPath = '/v1/skillseekerProject/getProjectData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seekerProjectDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerProjectDetails$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillSeekerProject>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerProjectControllerService.SeekerProjectDetailsPath, 'get');
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
        return r as StrictHttpResponse<Array<SkillSeekerProject>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seekerProjectDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerProjectDetails(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<Array<SkillSeekerProject>> {

    return this.seekerProjectDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerProject>>) => r.body as Array<SkillSeekerProject>)
    );
  }

  /**
   * Path part for operation deleteSeekerProjectDetails
   */
  static readonly DeleteSeekerProjectDetailsPath = '/v1/skillseekerProject/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSeekerProjectDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerProjectDetails$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerProjectControllerService.DeleteSeekerProjectDetailsPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSeekerProjectDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerProjectDetails(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSeekerProjectDetails$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
