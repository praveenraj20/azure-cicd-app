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

import { Client } from '../models/client';
import { ClientDetails } from '../models/client-details';
import { ClientEntity } from '../models/client-entity';

@Injectable({
  providedIn: 'root',
})
export class ClientControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateClient
   */
  static readonly UpdateClientPath = '/v1/ClientController/updateClient';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClient$Response(params: {
    context?: HttpContext
    body: ClientEntity
  }
): Observable<StrictHttpResponse<ClientEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.UpdateClientPath, 'put');
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
        return r as StrictHttpResponse<ClientEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClient(params: {
    context?: HttpContext
    body: ClientEntity
  }
): Observable<ClientEntity> {

    return this.updateClient$Response(params).pipe(
      map((r: StrictHttpResponse<ClientEntity>) => r.body as ClientEntity)
    );
  }

  /**
   * Path part for operation insertClient
   */
  static readonly InsertClientPath = '/v1/ClientController/insertClient';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClient$Response(params: {
    context?: HttpContext
    body: Array<Client>
  }
): Observable<StrictHttpResponse<Array<Client>>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.InsertClientPath, 'post');
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
        return r as StrictHttpResponse<Array<Client>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClient(params: {
    context?: HttpContext
    body: Array<Client>
  }
): Observable<Array<Client>> {

    return this.insertClient$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Client>>) => r.body as Array<Client>)
    );
  }

  /**
   * Path part for operation getSkillOwnerId
   */
  static readonly GetSkillOwnerIdPath = '/v1/ClientController/getClientDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSkillOwnerId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillOwnerId$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ClientDetails>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.GetSkillOwnerIdPath, 'get');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClientDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSkillOwnerId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSkillOwnerId(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<ClientDetails> {

    return this.getSkillOwnerId$Response(params).pipe(
      map((r: StrictHttpResponse<ClientDetails>) => r.body as ClientDetails)
    );
  }

  /**
   * Path part for operation deleteClient
   */
  static readonly DeleteClientPath = '/v1/ClientController/deleteClient';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteClient()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient$Response(params: {
    clientId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ClientControllerService.DeleteClientPath, 'delete');
    if (params) {
      rb.query('clientId', params.clientId, {});
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
   * To access the full response (for headers, for example), `deleteClient$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClient(params: {
    clientId: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteClient$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
