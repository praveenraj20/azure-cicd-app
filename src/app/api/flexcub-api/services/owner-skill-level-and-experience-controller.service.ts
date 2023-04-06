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


@Injectable({
  providedIn: 'root',
})
export class OwnerSkillLevelAndExperienceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOwnerSkillYearOfExperienceDetails
   */
  static readonly GetOwnerSkillYearOfExperienceDetailsPath = '/levelAndExperience';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOwnerSkillYearOfExperienceDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnerSkillYearOfExperienceDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Array<{
}>>>> {

    const rb = new RequestBuilder(this.rootUrl, OwnerSkillLevelAndExperienceControllerService.GetOwnerSkillYearOfExperienceDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Array<{
        }>>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOwnerSkillYearOfExperienceDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnerSkillYearOfExperienceDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<Array<{
}>>> {

    return this.getOwnerSkillYearOfExperienceDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Array<{
}>>>) => r.body as Array<Array<{
}>>)
    );
  }

}
