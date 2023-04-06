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

import { ContractDetails } from '../models/contract-details';
import { Contracts } from '../models/contracts';
import { OnBoarding } from '../models/on-boarding';
import { ProjectTaskDetails } from '../models/project-task-details';
import { SeekerAccess } from '../models/seeker-access';
import { SeekerModulesEntity } from '../models/seeker-modules-entity';
import { SeekerRoleListing } from '../models/seeker-role-listing';
import { SkillSeeker } from '../models/skill-seeker';
import { SubRole } from '../models/sub-role';
import { SubRoles } from '../models/sub-roles';
import { TemplateTable } from '../models/template-table';

@Injectable({
  providedIn: 'root',
})
export class SkillSeekerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateClientDetails
   */
  static readonly UpdateClientDetailsPath = '/v1/SkillSeekerController/updateData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateClientDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClientDetails$Response(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<StrictHttpResponse<SkillSeeker>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.UpdateClientDetailsPath, 'put');
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
        return r as StrictHttpResponse<SkillSeeker>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateClientDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateClientDetails(params: {
    context?: HttpContext
    body: SkillSeeker
  }
): Observable<SkillSeeker> {

    return this.updateClientDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeeker>) => r.body as SkillSeeker)
    );
  }

  /**
   * Path part for operation uploadAgreementTemplate
   */
  static readonly UploadAgreementTemplatePath = '/v1/SkillSeekerController/uploadAgreementTemplate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadAgreementTemplate()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadAgreementTemplate$Response(params?: {
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<Array<TemplateTable>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.UploadAgreementTemplatePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TemplateTable>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadAgreementTemplate$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadAgreementTemplate(params?: {
    context?: HttpContext
    body?: {
'document': Array<Blob>;
}
  }
): Observable<Array<TemplateTable>> {

    return this.uploadAgreementTemplate$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TemplateTable>>) => r.body as Array<TemplateTable>)
    );
  }

  /**
   * Path part for operation response
   */
  static readonly ResponsePath = '/v1/SkillSeekerController/onboarding';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  response$Response(params: {
    context?: HttpContext
    body: OnBoarding
  }
): Observable<StrictHttpResponse<OnBoarding>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.ResponsePath, 'post');
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
        return r as StrictHttpResponse<OnBoarding>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `response$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  response(params: {
    context?: HttpContext
    body: OnBoarding
  }
): Observable<OnBoarding> {

    return this.response$Response(params).pipe(
      map((r: StrictHttpResponse<OnBoarding>) => r.body as OnBoarding)
    );
  }

  /**
   * Path part for operation addSubRole
   */
  static readonly AddSubRolePath = '/v1/SkillSeekerController/addSubRole';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSubRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubRole$Response(params: {
    context?: HttpContext
    body: SubRole
  }
): Observable<StrictHttpResponse<Array<SeekerAccess>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.AddSubRolePath, 'post');
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
        return r as StrictHttpResponse<Array<SeekerAccess>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSubRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSubRole(params: {
    context?: HttpContext
    body: SubRole
  }
): Observable<Array<SeekerAccess>> {

    return this.addSubRole$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerAccess>>) => r.body as Array<SeekerAccess>)
    );
  }

  /**
   * Path part for operation addSeekerSubRoles
   */
  static readonly AddSeekerSubRolesPath = '/v1/SkillSeekerController/addSubRoleToSeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSeekerSubRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  addSeekerSubRoles$Response(params: {
    skillSeekerId: number;
    role: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillSeeker>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.AddSeekerSubRolesPath, 'post');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
      rb.query('role', params.role, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SkillSeeker>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addSeekerSubRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addSeekerSubRoles(params: {
    skillSeekerId: number;
    role: number;
    context?: HttpContext
  }
): Observable<SkillSeeker> {

    return this.addSeekerSubRoles$Response(params).pipe(
      map((r: StrictHttpResponse<SkillSeeker>) => r.body as SkillSeeker)
    );
  }

  /**
   * Path part for operation getSubRoles
   */
  static readonly GetSubRolesPath = '/v1/SkillSeekerController/getSubRoles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSubRoles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubRoles$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SubRoles>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetSubRolesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SubRoles>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSubRoles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSubRoles(params?: {
    context?: HttpContext
  }
): Observable<Array<SubRoles>> {

    return this.getSubRoles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SubRoles>>) => r.body as Array<SubRoles>)
    );
  }

  /**
   * Path part for operation getSeekerById
   */
  static readonly GetSeekerByIdPath = '/v1/SkillSeekerController/getSeekerByTaxId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSeekerById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerById$Response(params: {
    taxId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SkillSeeker>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetSeekerByIdPath, 'get');
    if (params) {
      rb.query('taxId', params.taxId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SkillSeeker>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSeekerById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerById(params: {
    taxId: string;
    context?: HttpContext
  }
): Observable<Array<SkillSeeker>> {

    return this.getSeekerById$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SkillSeeker>>) => r.body as Array<SkillSeeker>)
    );
  }

  /**
   * Path part for operation getProjectTaskDetailsBySeeker
   */
  static readonly GetProjectTaskDetailsBySeekerPath = '/v1/SkillSeekerController/getProjectTaskDetailsBySeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProjectTaskDetailsBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectTaskDetailsBySeeker$Response(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ProjectTaskDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetProjectTaskDetailsBySeekerPath, 'get');
    if (params) {
      rb.query('skillSeekerId', params.skillSeekerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProjectTaskDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProjectTaskDetailsBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProjectTaskDetailsBySeeker(params: {
    skillSeekerId: number;
    context?: HttpContext
  }
): Observable<ProjectTaskDetails> {

    return this.getProjectTaskDetailsBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<ProjectTaskDetails>) => r.body as ProjectTaskDetails)
    );
  }

  /**
   * Path part for operation getModules
   */
  static readonly GetModulesPath = '/v1/SkillSeekerController/getModules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getModules()` instead.
   *
   * This method doesn't expect any request body.
   */
  getModules$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerModulesEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetModulesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerModulesEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getModules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getModules(params?: {
    context?: HttpContext
  }
): Observable<Array<SeekerModulesEntity>> {

    return this.getModules$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerModulesEntity>>) => r.body as Array<SeekerModulesEntity>)
    );
  }

  /**
   * Path part for operation getLocationByKeyword
   */
  static readonly GetLocationByKeywordPath = '/v1/SkillSeekerController/getLocationByKeyword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLocationByKeyword()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLocationByKeyword$Response(params: {
    keyword: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetLocationByKeywordPath, 'get');
    if (params) {
      rb.query('keyword', params.keyword, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLocationByKeyword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLocationByKeyword(params: {
    keyword: string;
    context?: HttpContext
  }
): Observable<Array<string>> {

    return this.getLocationByKeyword$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation getListsOfContractDetails
   */
  static readonly GetListsOfContractDetailsPath = '/v1/SkillSeekerController/getListsOfContractDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListsOfContractDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListsOfContractDetails$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ContractDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetListsOfContractDetailsPath, 'get');
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
        return r as StrictHttpResponse<Array<ContractDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getListsOfContractDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListsOfContractDetails(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<Array<ContractDetails>> {

    return this.getListsOfContractDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContractDetails>>) => r.body as Array<ContractDetails>)
    );
  }

  /**
   * Path part for operation getListsOfContractDetailsInPartner
   */
  static readonly GetListsOfContractDetailsInPartnerPath = '/v1/SkillSeekerController/getListsOfContractDetailsInPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListsOfContractDetailsInPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListsOfContractDetailsInPartner$Response(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ContractDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetListsOfContractDetailsInPartnerPath, 'get');
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
        return r as StrictHttpResponse<Array<ContractDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getListsOfContractDetailsInPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListsOfContractDetailsInPartner(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<Array<ContractDetails>> {

    return this.getListsOfContractDetailsInPartner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContractDetails>>) => r.body as Array<ContractDetails>)
    );
  }

  /**
   * Path part for operation getContractDetails
   */
  static readonly GetContractDetailsPath = '/v1/SkillSeekerController/getContractDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractDetails$Response(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Contracts>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetContractDetailsPath, 'get');
    if (params) {
      rb.query('seekerId', params.seekerId, {});
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
   * To access the full response (for headers, for example), `getContractDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractDetails(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<Array<Contracts>> {

    return this.getContractDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Contracts>>) => r.body as Array<Contracts>)
    );
  }

  /**
   * Path part for operation getAllContractDetails
   */
  static readonly GetAllContractDetailsPath = '/v1/SkillSeekerController/getAllContractDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllContractDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllContractDetails$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<Contracts>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetAllContractDetailsPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getAllContractDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllContractDetails(params?: {
    context?: HttpContext
  }
): Observable<Array<Contracts>> {

    return this.getAllContractDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Contracts>>) => r.body as Array<Contracts>)
    );
  }

  /**
   * Path part for operation getAccessById
   */
  static readonly GetAccessByIdPath = '/v1/SkillSeekerController/getAccessByTaxId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAccessById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccessById$Response(params: {
    taxId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerRoleListing>>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.GetAccessByIdPath, 'get');
    if (params) {
      rb.query('taxId', params.taxId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerRoleListing>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAccessById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAccessById(params: {
    taxId: string;
    context?: HttpContext
  }
): Observable<Array<SeekerRoleListing>> {

    return this.getAccessById$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerRoleListing>>) => r.body as Array<SeekerRoleListing>)
    );
  }

  /**
   * Path part for operation deleteClientDetails
   */
  static readonly DeleteClientDetailsPath = '/v1/SkillSeekerController/deleteData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteClientDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClientDetails$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SkillSeekerControllerService.DeleteClientDetailsPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteClientDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteClientDetails(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.deleteClientDetails$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
