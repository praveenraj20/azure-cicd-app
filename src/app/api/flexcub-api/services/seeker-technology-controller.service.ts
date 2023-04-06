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

import { SkillSeekerTechnology } from '../models/skill-seeker-technology';

@Injectable({
  providedIn: 'root',
})
export class SeekerTechnologyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateSeekerTechnologyDetails
   */
  static readonly UpdateSeekerTechnologyDetailsPath = '/v1/skillSeekerTechCard/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSeekerTechnologyDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerTechnologyDetails$Response(params: {
    context?: HttpContext
    body: SkillSeekerTechnology
  }
): Observable<StrictHttpResponse<SkillSeekerTechnology>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTechnologyControllerService.UpdateSeekerTechnologyDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillSeekerTechnology>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSeekerTechnologyDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSeekerTechnologyDetails(params: {
    context?: HttpContext
    body: SkillSeekerTechnology
  }
): Observable<SkillSeekerTechnology> {

    return this.updateSeekerTechnologyDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeekerTechnology>) => r.body as SkillSeekerTechnology)
    );
  }

  /**
   * Path part for operation getDataByProjectId
   */
  static readonly GetDataByProjectIdPath = '/v1/skillSeekerTechCard/getDataByProjectId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataByProjectId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataByProjectId$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillSeekerTechnology>>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTechnologyControllerService.GetDataByProjectIdPath, 'get');
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
        return r as StrictHttpResponse<Array<SkillSeekerTechnology>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDataByProjectId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataByProjectId(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Array<SkillSeekerTechnology>> {

    return this.getDataByProjectId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerTechnology>>) => r.body as Array<SkillSeekerTechnology>)
    );
  }

  /**
   * Path part for operation deleteSeekerTechDetails
   */
  static readonly DeleteSeekerTechDetailsPath = '/v1/skillSeekerTechCard/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSeekerTechDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerTechDetails$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SeekerTechnologyControllerService.DeleteSeekerTechDetailsPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteSeekerTechDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSeekerTechDetails(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteSeekerTechDetails$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
