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

import { Contracts } from '../models/contracts';
import { OwnerRateUpdate } from '../models/owner-rate-update';
import { OwnerStatusUpdate } from '../models/owner-status-update';
import { RateCardToSkillOwner } from '../models/rate-card-to-skill-owner';
import { SkillOwnerRateCard } from '../models/skill-owner-rate-card';
import { SkillPartner } from '../models/skill-partner';
import { SkillPartnerEntity } from '../models/skill-partner-entity';

@Injectable({
  providedIn: 'root',
})
export class SkillPartnerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation skillOwnerStatusUpdate
   */
  static readonly SkillOwnerStatusUpdatePath = '/v1/SkillPartnerController/updateSkillOwnerStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `skillOwnerStatusUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerStatusUpdate$Response(params: {
    context?: HttpContext
    body: OwnerStatusUpdate
  }
): Observable<StrictHttpResponse<OwnerStatusUpdate>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.SkillOwnerStatusUpdatePath, 'put');
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
        return r as StrictHttpResponse<OwnerStatusUpdate>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `skillOwnerStatusUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerStatusUpdate(params: {
    context?: HttpContext
    body: OwnerStatusUpdate
  }
): Observable<OwnerStatusUpdate> {

    return this.skillOwnerStatusUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerStatusUpdate>) => r.body as OwnerStatusUpdate)
    );
  }

  /**
   * Path part for operation skillOwnerRateUpdate
   */
  static readonly SkillOwnerRateUpdatePath = '/v1/SkillPartnerController/updateSkillOwnerRate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `skillOwnerRateUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerRateUpdate$Response(params: {
    context?: HttpContext
    body: OwnerRateUpdate
  }
): Observable<StrictHttpResponse<OwnerRateUpdate>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.SkillOwnerRateUpdatePath, 'put');
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
        return r as StrictHttpResponse<OwnerRateUpdate>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `skillOwnerRateUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerRateUpdate(params: {
    context?: HttpContext
    body: OwnerRateUpdate
  }
): Observable<OwnerRateUpdate> {

    return this.skillOwnerRateUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<OwnerRateUpdate>) => r.body as OwnerRateUpdate)
    );
  }

  /**
   * Path part for operation addRateCard
   */
  static readonly AddRateCardPath = '/v1/SkillPartnerController/updateRateCardDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addRateCard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addRateCard$Response(params: {
    context?: HttpContext
    body: RateCardToSkillOwner
  }
): Observable<StrictHttpResponse<Array<SkillOwnerRateCard>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.AddRateCardPath, 'put');
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
        return r as StrictHttpResponse<Array<SkillOwnerRateCard>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addRateCard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addRateCard(params: {
    context?: HttpContext
    body: RateCardToSkillOwner
  }
): Observable<Array<SkillOwnerRateCard>> {

    return this.addRateCard$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillOwnerRateCard>>) => r.body as Array<SkillOwnerRateCard>)
    );
  }

  /**
   * Path part for operation updateSkillPartnerDetails
   */
  static readonly UpdateSkillPartnerDetailsPath = '/v1/SkillPartnerController/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSkillPartnerDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSkillPartnerDetails$Response(params: {
    context?: HttpContext
    body: SkillPartner
  }
): Observable<StrictHttpResponse<SkillPartner>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.UpdateSkillPartnerDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillPartner>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSkillPartnerDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSkillPartnerDetails(params: {
    context?: HttpContext
    body: SkillPartner
  }
): Observable<SkillPartner> {

    return this.updateSkillPartnerDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillPartner>) => r.body as SkillPartner)
    );
  }

  /**
   * Path part for operation serviceFee
   */
  static readonly ServiceFeePath = '/v1/SkillPartnerController/serviceFeeInPercentage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `serviceFee()` instead.
   *
   * This method doesn't expect any request body.
   */
  serviceFee$Response(params: {
    partnerId: number;
    percentage: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillPartnerEntity>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.ServiceFeePath, 'put');
    if (params) {
      rb.query('partnerId', params.partnerId, {});
      rb.query('percentage', params.percentage, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SkillPartnerEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `serviceFee$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  serviceFee(params: {
    partnerId: number;
    percentage: number;
    context?: HttpContext
  }
): Observable<SkillPartnerEntity> {

    return this.serviceFee$Response(params).pipe(
      map((r: StrictHttpResponse<SkillPartnerEntity>) => r.body as SkillPartnerEntity)
    );
  }

  /**
   * Path part for operation insertSkillPartnerDetails
   */
  static readonly InsertSkillPartnerDetailsPath = '/v1/SkillPartnerController/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertSkillPartnerDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSkillPartnerDetails$Response(params: {
    context?: HttpContext
    body: SkillPartner
  }
): Observable<StrictHttpResponse<SkillPartner>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.InsertSkillPartnerDetailsPath, 'post');
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
        return r as StrictHttpResponse<SkillPartner>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertSkillPartnerDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSkillPartnerDetails(params: {
    context?: HttpContext
    body: SkillPartner
  }
): Observable<SkillPartner> {

    return this.insertSkillPartnerDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillPartner>) => r.body as SkillPartner)
    );
  }

  /**
   * Path part for operation setDataInDb
   */
  static readonly SetDataInDbPath = '/v1/SkillPartnerController/syncPartnerExcel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setDataInDb()` instead.
   *
   * This method doesn't expect any request body.
   */
  setDataInDb$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.SetDataInDbPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain',
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
   * To access the full response (for headers, for example), `setDataInDb$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setDataInDb(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.setDataInDb$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getPartnerDetails
   */
  static readonly GetPartnerDetailsPath = '/v1/SkillPartnerController/getPartnerDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPartnerDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartnerDetails$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillPartner>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.GetPartnerDetailsPath, 'get');
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
        return r as StrictHttpResponse<SkillPartner>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPartnerDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPartnerDetails(params: {
    id: number;
    context?: HttpContext
  }
): Observable<SkillPartner> {

    return this.getPartnerDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillPartner>) => r.body as SkillPartner)
    );
  }

  /**
   * Path part for operation getSkillPartnerDetails
   */
  static readonly GetSkillPartnerDetailsPath = '/v1/SkillPartnerController/getData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSkillPartnerDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillPartnerDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillPartner>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.GetSkillPartnerDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillPartner>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSkillPartnerDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillPartnerDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<SkillPartner>> {

    return this.getSkillPartnerDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillPartner>>) => r.body as Array<SkillPartner>)
    );
  }

  /**
   * Path part for operation getContractDetails1
   */
  static readonly GetContractDetails1Path = '/v1/SkillPartnerController/getContractDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractDetails1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractDetails1$Response(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Contracts>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.GetContractDetails1Path, 'get');
    if (params) {
      rb.query('partnerId', params.partnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Contracts>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getContractDetails1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractDetails1(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<Array<Contracts>> {

    return this.getContractDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Contracts>>) => r.body as Array<Contracts>)
    );
  }

  /**
   * Path part for operation deleteData
   */
  static readonly DeleteDataPath = '/v1/SkillPartnerController/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteData()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillPartnerControllerService.DeleteDataPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteData(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteData$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
