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

import { Visa } from '../models/visa';

@Injectable({
  providedIn: 'root',
})
export class VisaStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVisa
   */
  static readonly GetVisaPath = '/v1/VisaStatusController/getVisa';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVisa()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisa$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Visa>>> {

    const rb = new RequestBuilder(this.rootUrl, VisaStatusControllerService.GetVisaPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Visa>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVisa$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVisa(params?: {
    context?: HttpContext
  }
): Observable<Array<Visa>> {

    return this.getVisa$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Visa>>) => r.body as Array<Visa>)
    );
  }

}
