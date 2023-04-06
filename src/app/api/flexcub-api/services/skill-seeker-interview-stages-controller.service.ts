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

import { SkillSeekerInterviewStages } from '../models/skill-seeker-interview-stages';

@Injectable({
  providedIn: 'root',
})
export class SkillSeekerInterviewStagesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getInterviewStages
   */
  static readonly GetInterviewStagesPath = '/v1/SeekerInterviewStages/getInterviewStages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInterviewStages()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInterviewStages$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillSeekerInterviewStages>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerInterviewStagesControllerService.GetInterviewStagesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillSeekerInterviewStages>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInterviewStages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInterviewStages(params?: {
    context?: HttpContext
  }
): Observable<Array<SkillSeekerInterviewStages>> {

    return this.getInterviewStages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeekerInterviewStages>>) => r.body as Array<SkillSeekerInterviewStages>)
    );
  }

}
