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

import { OwnerSkillTechnologies } from '../models/owner-skill-technologies';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillTechnologiesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDetailsTech
   */
  static readonly GetDetailsTechPath = '/v1/OwnerSkillTechnologies/getData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailsTech()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsTech$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerSkillTechnologies>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillTechnologiesControllerService.GetDetailsTechPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerSkillTechnologies>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetailsTech$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsTech(params?: {
    context?: HttpContext
  }
): Observable<Array<OwnerSkillTechnologies>> {

    return this.getDetailsTech$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerSkillTechnologies>>) => r.body as Array<OwnerSkillTechnologies>)
    );
  }

}
