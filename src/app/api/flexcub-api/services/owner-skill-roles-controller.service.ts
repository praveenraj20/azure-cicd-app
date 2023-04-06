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

import { OwnerSkillRoles } from '../models/owner-skill-roles';

@Injectable({
  providedIn: 'root',
})
export class OwnerSkillRolesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDetailsroles
   */
  static readonly GetDetailsrolesPath = '/v1/OwnerSkillRoles/getlevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDetailsroles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsroles$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerSkillRoles>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillRolesControllerService.GetDetailsrolesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerSkillRoles>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDetailsroles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDetailsroles(params?: {
    context?: HttpContext
  }
): Observable<Array<OwnerSkillRoles>> {

    return this.getDetailsroles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerSkillRoles>>) => r.body as Array<OwnerSkillRoles>)
    );
  }

}
