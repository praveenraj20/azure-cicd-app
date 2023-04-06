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

import { FileResponse } from '../models/file-response';
import { SkillOwnerDto } from '../models/skill-owner-dto';
import { SkillOwnerEntity } from '../models/skill-owner-entity';
import { SkillOwnerGender } from '../models/skill-owner-gender';
import { SkillOwnerMaritalStatus } from '../models/skill-owner-marital-status';

@Injectable({
  providedIn: 'root',
})
export class SkillOwnerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateOwnerProfile
   */
  static readonly UpdateOwnerProfilePath = '/api/v1/updateOwnerProfile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOwnerProfile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerProfile$Response(params: {
    context?: HttpContext
    body: SkillOwnerEntity
  }
): Observable<StrictHttpResponse<SkillOwnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.UpdateOwnerProfilePath, 'put');
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
        return r as StrictHttpResponse<SkillOwnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateOwnerProfile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerProfile(params: {
    context?: HttpContext
    body: SkillOwnerEntity
  }
): Observable<SkillOwnerDto> {

    return this.updateOwnerProfile$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerDto>) => r.body as SkillOwnerDto)
    );
  }

  /**
   * Path part for operation updateOwnerDetails1
   */
  static readonly UpdateOwnerDetails1Path = '/api/v1/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOwnerDetails1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerDetails1$Response(params: {
    context?: HttpContext
    body: SkillOwnerEntity
  }
): Observable<StrictHttpResponse<SkillOwnerEntity>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.UpdateOwnerDetails1Path, 'put');
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
        return r as StrictHttpResponse<SkillOwnerEntity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateOwnerDetails1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOwnerDetails1(params: {
    context?: HttpContext
    body: SkillOwnerEntity
  }
): Observable<SkillOwnerEntity> {

    return this.updateOwnerDetails1$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerEntity>) => r.body as SkillOwnerEntity)
    );
  }

  /**
   * Path part for operation insertAttachment
   */
  static readonly InsertAttachmentPath = '/api/v1/insertAttachment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertAttachment()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  insertAttachment$Response(params: {
    id: number;
    context?: HttpContext
    body?: {
'resume'?: Blob;
'document'?: Array<Blob>;
'image'?: Blob;
'federal'?: Blob;
}
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.InsertAttachmentPath, 'put');
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertAttachment$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  insertAttachment(params: {
    id: number;
    context?: HttpContext
    body?: {
'resume'?: Blob;
'document'?: Array<Blob>;
'image'?: Blob;
'federal'?: Blob;
}
  }
): Observable<string> {

    return this.insertAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation insertDetails3
   */
  static readonly InsertDetails3Path = '/api/v1/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertDetails3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails3$Response(params: {
    context?: HttpContext
    body: Array<SkillOwnerEntity>
  }
): Observable<StrictHttpResponse<Array<SkillOwnerEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.InsertDetails3Path, 'post');
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
        return r as StrictHttpResponse<Array<SkillOwnerEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertDetails3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails3(params: {
    context?: HttpContext
    body: Array<SkillOwnerEntity>
  }
): Observable<Array<SkillOwnerEntity>> {

    return this.insertDetails3$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillOwnerEntity>>) => r.body as Array<SkillOwnerEntity>)
    );
  }

  /**
   * Path part for operation insertAttachment1
   */
  static readonly InsertAttachment1Path = '/api/v1/documentUpdates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertAttachment1()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  insertAttachment1$Response(params: {
    ownerId: number;
    id: number;
    context?: HttpContext
    body?: {
'document'?: Blob;
}
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.InsertAttachment1Path, 'post');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
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
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertAttachment1$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  insertAttachment1(params: {
    ownerId: number;
    id: number;
    context?: HttpContext
    body?: {
'document'?: Blob;
}
  }
): Observable<string> {

    return this.insertAttachment1$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation downloadOtherDocuments
   */
  static readonly DownloadOtherDocumentsPath = '/api/v1/otherFilesDownload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadOtherDocuments()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOtherDocuments$Response(params: {
    ownerId: number;
    count: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DownloadOtherDocumentsPath, 'get');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('count', params.count, {});
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
   * To access the full response (for headers, for example), `downloadOtherDocuments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadOtherDocuments(params: {
    ownerId: number;
    count: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadOtherDocuments$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation maritalStatusList
   */
  static readonly MaritalStatusListPath = '/api/v1/maritalStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `maritalStatusList()` instead.
   *
   * This method doesn't expect any request body.
   */
  maritalStatusList$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillOwnerMaritalStatus>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.MaritalStatusListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillOwnerMaritalStatus>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `maritalStatusList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  maritalStatusList(params?: {
    context?: HttpContext
  }
): Observable<Array<SkillOwnerMaritalStatus>> {

    return this.maritalStatusList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillOwnerMaritalStatus>>) => r.body as Array<SkillOwnerMaritalStatus>)
    );
  }

  /**
   * Path part for operation getById
   */
  static readonly GetByIdPath = '/api/v1/getBySkillOwnerId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillOwnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.GetByIdPath, 'get');
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
        return r as StrictHttpResponse<SkillOwnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: {
    id: number;
    context?: HttpContext
  }
): Observable<SkillOwnerDto> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerDto>) => r.body as SkillOwnerDto)
    );
  }

  /**
   * Path part for operation getGenderList
   */
  static readonly GetGenderListPath = '/api/v1/gender';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGenderList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGenderList$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillOwnerGender>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.GetGenderListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillOwnerGender>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGenderList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGenderList(params?: {
    context?: HttpContext
  }
): Observable<Array<SkillOwnerGender>> {

    return this.getGenderList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillOwnerGender>>) => r.body as Array<SkillOwnerGender>)
    );
  }

  /**
   * Path part for operation fileDownloadResume
   */
  static readonly FileDownloadResumePath = '/api/v1/fileDownloadResume';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileDownloadResume()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileDownloadResume$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.FileDownloadResumePath, 'get');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `fileDownloadResume$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileDownloadResume(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.fileDownloadResume$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadImage
   */
  static readonly DownloadImagePath = '/api/v1/fileDownloadImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImage$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DownloadImagePath, 'get');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `downloadImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImage(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.downloadImage$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation fileDownloadFederal
   */
  static readonly FileDownloadFederalPath = '/api/v1/fileDownloadFederal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileDownloadFederal()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileDownloadFederal$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.FileDownloadFederalPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `fileDownloadFederal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileDownloadFederal(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Blob> {

    return this.fileDownloadFederal$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadResume
   */
  static readonly DownloadResumePath = '/api/v1/downloadResume';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadResume()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadResume$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DownloadResumePath, 'get');
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
        return r as StrictHttpResponse<FileResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadResume$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadResume(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadResume$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

  /**
   * Path part for operation downloadImageFile
   */
  static readonly DownloadImageFilePath = '/api/v1/downloadImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadImageFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImageFile$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DownloadImageFilePath, 'get');
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
        return r as StrictHttpResponse<FileResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadImageFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImageFile(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadImageFile$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

  /**
   * Path part for operation downloadFederal
   */
  static readonly DownloadFederalPath = '/api/v1/downloadFederal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFederal()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFederal$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DownloadFederalPath, 'get');
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
        return r as StrictHttpResponse<FileResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFederal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFederal(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.downloadFederal$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

  /**
   * Path part for operation otherFilesDownload
   */
  static readonly OtherFilesDownloadPath = '/api/v1/OtherDocuments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `otherFilesDownload()` instead.
   *
   * This method doesn't expect any request body.
   */
  otherFilesDownload$Response(params: {
    ownerId: number;
    count: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.OtherFilesDownloadPath, 'get');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('count', params.count, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `otherFilesDownload$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  otherFilesDownload(params: {
    ownerId: number;
    count: number;
    context?: HttpContext
  }
): Observable<FileResponse> {

    return this.otherFilesDownload$Response(params).pipe(
      map((r: StrictHttpResponse<FileResponse>) => r.body as FileResponse)
    );
  }

  /**
   * Path part for operation deletePortfolio
   */
  static readonly DeletePortfolioPath = '/api/v1/deletePortfolio';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePortfolio()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePortfolio$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DeletePortfolioPath, 'delete');
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
   * To access the full response (for headers, for example), `deletePortfolio$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePortfolio(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deletePortfolio$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deletePortfolio1
   */
  static readonly DeletePortfolio1Path = '/api/v1/deleteOtherDocuments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePortfolio1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePortfolio1$Response(params: {
    id: number;
    count: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillOwnerControllerService.DeletePortfolio1Path, 'delete');
    if (params) {
      rb.query('id', params.id, {});
      rb.query('count', params.count, {});
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
   * To access the full response (for headers, for example), `deletePortfolio1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePortfolio1(params: {
    id: number;
    count: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deletePortfolio1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
