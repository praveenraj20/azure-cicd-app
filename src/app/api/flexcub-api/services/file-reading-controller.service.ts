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

import { SkillOwnerFile } from '../models/skill-owner-file';

@Injectable({
  providedIn: 'root',
})
export class FileReadingControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation uploadExcel
   */
  static readonly UploadExcelPath = '/v1/file-reading/uploadExcel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadExcel()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadExcel$Response(params: {
    id: string;
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<SkillOwnerFile>> {

    const rb = new RequestBuilder(this.rootUrl, FileReadingControllerService.UploadExcelPath, 'post');
    if (params) {
      rb.query('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SkillOwnerFile>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadExcel$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadExcel(params: {
    id: string;
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<SkillOwnerFile> {

    return this.uploadExcel$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerFile>) => r.body as SkillOwnerFile)
    );
  }

  /**
   * Path part for operation setSkillPartnerDataInDb
   */
  static readonly SetSkillPartnerDataInDbPath = '/v1/file-reading/syncSkillPartnerFile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setSkillPartnerDataInDb()` instead.
   *
   * This method doesn't expect any request body.
   */
  setSkillPartnerDataInDb$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FileReadingControllerService.SetSkillPartnerDataInDbPath, 'get');
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
   * To access the full response (for headers, for example), `setSkillPartnerDataInDb$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setSkillPartnerDataInDb(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.setSkillPartnerDataInDb$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation setSkillOwnerDataInDb
   */
  static readonly SetSkillOwnerDataInDbPath = '/v1/file-reading/syncSkillOwnerFile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setSkillOwnerDataInDb()` instead.
   *
   * This method doesn't expect any request body.
   */
  setSkillOwnerDataInDb$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FileReadingControllerService.SetSkillOwnerDataInDbPath, 'get');
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
   * To access the full response (for headers, for example), `setSkillOwnerDataInDb$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setSkillOwnerDataInDb(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.setSkillOwnerDataInDb$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation downloadTemplate
   */
  static readonly DownloadTemplatePath = '/v1/file-reading/downloadTemplate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadTemplate$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, FileReadingControllerService.DownloadTemplatePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'multipart/form-data',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadTemplate(params?: {
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
