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

import { OwnerSkillLevel } from '../models/owner-skill-level';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillLevelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDetails1
   */
  static readonly GetDetails1Path = '/v1/OwnerSkillLevel/getSkillLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetails1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails1$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerSkillLevel>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillLevelControllerService.GetDetails1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerSkillLevel>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetails1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetails1(params?: {
    context?: HttpContext
  }
): Observable<Array<OwnerSkillLevel>> {

    return this.getDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerSkillLevel>>) => r.body as Array<OwnerSkillLevel>)
    );
  }

}
