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

import { HiringEntity } from '../models/hiring-entity';

@Injectable({
  providedIn: 'root',
})
export class HiringControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateHiringDetailsData
   */
  static readonly UpdateHiringDetailsDataPath = '/v1/HiringController/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHiringDetailsData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHiringDetailsData$Response(params: {
    context?: HttpContext
    body: HiringEntity
  }
): Observable<StrictHttpResponse<HiringEntity>> {

    const rb = new RequestBuilder(this.rootUrl, HiringControllerService.UpdateHiringDetailsDataPath, 'put');
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
        return r as StrictHttpResponse<HiringEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHiringDetailsData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHiringDetailsData(params: {
    context?: HttpContext
    body: HiringEntity
  }
): Observable<HiringEntity> {

    return this.updateHiringDetailsData$Response(params).pipe(
      map((r: StrictHttpResponse<HiringEntity>) => r.body as HiringEntity)
    );
  }

  /**
   * Path part for operation insertHiringDetailsData
   */
  static readonly InsertHiringDetailsDataPath = '/v1/HiringController/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertHiringDetailsData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertHiringDetailsData$Response(params: {
    context?: HttpContext
    body: HiringEntity
  }
): Observable<StrictHttpResponse<HiringEntity>> {

    const rb = new RequestBuilder(this.rootUrl, HiringControllerService.InsertHiringDetailsDataPath, 'post');
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
        return r as StrictHttpResponse<HiringEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertHiringDetailsData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertHiringDetailsData(params: {
    context?: HttpContext
    body: HiringEntity
  }
): Observable<HiringEntity> {

    return this.insertHiringDetailsData$Response(params).pipe(
      map((r: StrictHttpResponse<HiringEntity>) => r.body as HiringEntity)
    );
  }

  /**
   * Path part for operation getHiringDetails
   */
  static readonly GetHiringDetailsPath = '/v1/HiringController/getData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHiringDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHiringDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<HiringEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, HiringControllerService.GetHiringDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<HiringEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHiringDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHiringDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<HiringEntity>> {

    return this.getHiringDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HiringEntity>>) => r.body as Array<HiringEntity>)
    );
  }

  /**
   * Path part for operation deleteData2
   */
  static readonly DeleteData2Path = '/v1/HiringController/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteData2()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData2$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, HiringControllerService.DeleteData2Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteData2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData2(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteData2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
