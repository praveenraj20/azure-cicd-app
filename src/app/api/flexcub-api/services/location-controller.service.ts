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
export class LocationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getStates
   */
  static readonly GetStatesPath = '/v1/LocationController/getStates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStates$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{
[key: string]: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, LocationControllerService.GetStatesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        [key: string]: string;
        }>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStates(params?: {
    context?: HttpContext
  }
): Observable<Array<{
[key: string]: string;
}>> {

    return this.getStates$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{
[key: string]: string;
}>>) => r.body as Array<{
[key: string]: string;
}>)
    );
  }

  /**
   * Path part for operation getCities
   */
  static readonly GetCitiesPath = '/v1/LocationController/getCities/{state}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCities()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCities$Response(params: {
    state: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<{
[key: string]: string;
}>>> {

    const rb = new RequestBuilder(this.rootUrl, LocationControllerService.GetCitiesPath, 'get');
    if (params) {
      rb.path('state', params.state, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<{
        [key: string]: string;
        }>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCities(params: {
    state: string;
    context?: HttpContext
  }
): Observable<Array<{
[key: string]: string;
}>> {

    return this.getCities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<{
[key: string]: string;
}>>) => r.body as Array<{
[key: string]: string;
}>)
    );
  }

  /**
   * Path part for operation generateToken
   */
  static readonly GenerateTokenPath = '/v1/LocationController/generateToken';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateToken$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, LocationControllerService.GenerateTokenPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `generateToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateToken(params?: {
    context?: HttpContext
  }
): Observable<string> {

    return this.generateToken$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
