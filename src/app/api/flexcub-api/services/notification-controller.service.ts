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

import { HistoryOfJobs } from '../models/history-of-jobs';
import { JobHistory } from '../models/job-history';
import { OwnerDetails } from '../models/owner-details';
import { OwnerNotificationsEntity } from '../models/owner-notifications-entity';
import { PartnerNotificationsEntity } from '../models/partner-notifications-entity';
import { SeekerNotificationsEntity } from '../models/seeker-notifications-entity';
import { SuperAdminNotifications } from '../models/super-admin-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation seekerMarkAsRead
   */
  static readonly SeekerMarkAsReadPath = '/v1/notifications/markAsReadSeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seekerMarkAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerMarkAsRead$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.SeekerMarkAsReadPath, 'put');
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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seekerMarkAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerMarkAsRead(params: {
    id: number;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.seekerMarkAsRead$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation partnerMarkAsRead
   */
  static readonly PartnerMarkAsReadPath = '/v1/notifications/markAsReadPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerMarkAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerMarkAsRead$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.PartnerMarkAsReadPath, 'put');
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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerMarkAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerMarkAsRead(params: {
    id: number;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.partnerMarkAsRead$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation ownerMarkAsRead
   */
  static readonly OwnerMarkAsReadPath = '/v1/notifications/markAsReadOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ownerMarkAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  ownerMarkAsRead$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.OwnerMarkAsReadPath, 'put');
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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `ownerMarkAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ownerMarkAsRead(params: {
    id: number;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.ownerMarkAsRead$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation adminMarkAsRead
   */
  static readonly AdminMarkAsReadPath = '/v1/notifications/markAsReadAdmin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminMarkAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminMarkAsRead$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.AdminMarkAsReadPath, 'put');
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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `adminMarkAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminMarkAsRead(params: {
    id: number;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.adminMarkAsRead$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getSeekerNotificationByOwner
   */
  static readonly GetSeekerNotificationByOwnerPath = '/v1/notifications/getSeekerNotificationForOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSeekerNotificationByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerNotificationByOwner$Response(params: {
    ownerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetSeekerNotificationByOwnerPath, 'get');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('jobId', params.jobId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeekerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSeekerNotificationByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerNotificationByOwner(params: {
    ownerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<Array<SeekerNotificationsEntity>> {

    return this.getSeekerNotificationByOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerNotificationsEntity>>) => r.body as Array<SeekerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getSeekerLastFiveNotification
   */
  static readonly GetSeekerLastFiveNotificationPath = '/v1/notifications/getSeekerLastFiveNotification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSeekerLastFiveNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerLastFiveNotification$Response(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetSeekerLastFiveNotificationPath, 'get');
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
        return r as StrictHttpResponse<Array<SeekerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSeekerLastFiveNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSeekerLastFiveNotification(params: {
    seekerId: number;
    context?: HttpContext
  }
): Observable<Array<SeekerNotificationsEntity>> {

    return this.getSeekerLastFiveNotification$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerNotificationsEntity>>) => r.body as Array<SeekerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getNotificationForParticularOwner
   */
  static readonly GetNotificationForParticularOwnerPath = '/v1/notifications/getPartnerNotificationForParticularOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotificationForParticularOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationForParticularOwner$Response(params: {
    ownerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PartnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetNotificationForParticularOwnerPath, 'get');
    if (params) {
      rb.query('ownerId', params.ownerId, {});
      rb.query('jobId', params.jobId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PartnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNotificationForParticularOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationForParticularOwner(params: {
    ownerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<Array<PartnerNotificationsEntity>> {

    return this.getNotificationForParticularOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PartnerNotificationsEntity>>) => r.body as Array<PartnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getOwnerDetailsInPartner
   */
  static readonly GetOwnerDetailsInPartnerPath = '/v1/notifications/getOwnerDetailsInPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOwnerDetailsInPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnerDetailsInPartner$Response(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerDetails>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetOwnerDetailsInPartnerPath, 'get');
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
        return r as StrictHttpResponse<Array<OwnerDetails>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOwnerDetailsInPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnerDetailsInPartner(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<Array<OwnerDetails>> {

    return this.getOwnerDetailsInPartner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerDetails>>) => r.body as Array<OwnerDetails>)
    );
  }

  /**
   * Path part for operation getLastFiveSuperAdminNotication
   */
  static readonly GetLastFiveSuperAdminNoticationPath = '/v1/notifications/getLastFiveSuperAdminNotification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastFiveSuperAdminNotication()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveSuperAdminNotication$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SuperAdminNotifications>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetLastFiveSuperAdminNoticationPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SuperAdminNotifications>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLastFiveSuperAdminNotication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveSuperAdminNotication(params?: {
    context?: HttpContext
  }
): Observable<Array<SuperAdminNotifications>> {

    return this.getLastFiveSuperAdminNotication$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SuperAdminNotifications>>) => r.body as Array<SuperAdminNotifications>)
    );
  }

  /**
   * Path part for operation getLastFiveNotificationOfPartner
   */
  static readonly GetLastFiveNotificationOfPartnerPath = '/v1/notifications/getLastFiveNotificationOfPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastFiveNotificationOfPartner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveNotificationOfPartner$Response(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PartnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetLastFiveNotificationOfPartnerPath, 'get');
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
        return r as StrictHttpResponse<Array<PartnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLastFiveNotificationOfPartner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveNotificationOfPartner(params: {
    partnerId: number;
    context?: HttpContext
  }
): Observable<Array<PartnerNotificationsEntity>> {

    return this.getLastFiveNotificationOfPartner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PartnerNotificationsEntity>>) => r.body as Array<PartnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getLastFiveNotificationOfOwner
   */
  static readonly GetLastFiveNotificationOfOwnerPath = '/v1/notifications/getLastFiveNotificationOfOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLastFiveNotificationOfOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveNotificationOfOwner$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetLastFiveNotificationOfOwnerPath, 'get');
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
        return r as StrictHttpResponse<Array<OwnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLastFiveNotificationOfOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLastFiveNotificationOfOwner(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<Array<OwnerNotificationsEntity>> {

    return this.getLastFiveNotificationOfOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerNotificationsEntity>>) => r.body as Array<OwnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getJobSpecificNotificationForOwner
   */
  static readonly GetJobSpecificNotificationForOwnerPath = '/v1/notifications/getJobSpecificNotificationForOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobSpecificNotificationForOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobSpecificNotificationForOwner$Response(params: {
    skillOwnerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetJobSpecificNotificationForOwnerPath, 'get');
    if (params) {
      rb.query('skillOwnerId', params.skillOwnerId, {});
      rb.query('jobId', params.jobId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OwnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJobSpecificNotificationForOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobSpecificNotificationForOwner(params: {
    skillOwnerId: number;
    jobId: string;
    context?: HttpContext
  }
): Observable<Array<OwnerNotificationsEntity>> {

    return this.getJobSpecificNotificationForOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerNotificationsEntity>>) => r.body as Array<OwnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getJobHistoryInSeeker
   */
  static readonly GetJobHistoryInSeekerPath = '/v1/notifications/getJobHistoryInPartner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getJobHistoryInSeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobHistoryInSeeker$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<JobHistory>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetJobHistoryInSeekerPath, 'get');
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
        return r as StrictHttpResponse<Array<JobHistory>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getJobHistoryInSeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getJobHistoryInSeeker(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<Array<JobHistory>> {

    return this.getJobHistoryInSeeker$Response(params).pipe(
      map((r: StrictHttpResponse<Array<JobHistory>>) => r.body as Array<JobHistory>)
    );
  }

  /**
   * Path part for operation historyOfJobs
   */
  static readonly HistoryOfJobsPath = '/v1/notifications/getHistoryOfJobs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `historyOfJobs()` instead.
   *
   * This method doesn't expect any request body.
   */
  historyOfJobs$Response(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<HistoryOfJobs>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.HistoryOfJobsPath, 'get');
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
        return r as StrictHttpResponse<Array<HistoryOfJobs>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `historyOfJobs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  historyOfJobs(params: {
    ownerId: number;
    context?: HttpContext
  }
): Observable<Array<HistoryOfJobs>> {

    return this.historyOfJobs$Response(params).pipe(
      map((r: StrictHttpResponse<Array<HistoryOfJobs>>) => r.body as Array<HistoryOfJobs>)
    );
  }

  /**
   * Path part for operation seekerNotification
   */
  static readonly SeekerNotificationPath = '/v1/notifications/getAllNotificationBySeekerId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seekerNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerNotification$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SeekerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.SeekerNotificationPath, 'get');
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
        return r as StrictHttpResponse<Array<SeekerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seekerNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seekerNotification(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Array<SeekerNotificationsEntity>> {

    return this.seekerNotification$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeekerNotificationsEntity>>) => r.body as Array<SeekerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation partnerNotification
   */
  static readonly PartnerNotificationPath = '/v1/notifications/getAllNotificationByPartnerId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `partnerNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerNotification$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PartnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.PartnerNotificationPath, 'get');
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
        return r as StrictHttpResponse<Array<PartnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `partnerNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  partnerNotification(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Array<PartnerNotificationsEntity>> {

    return this.partnerNotification$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PartnerNotificationsEntity>>) => r.body as Array<PartnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation ownerNotification
   */
  static readonly OwnerNotificationPath = '/v1/notifications/getAllNotificationByOwnerId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ownerNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  ownerNotification$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<OwnerNotificationsEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.OwnerNotificationPath, 'get');
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
        return r as StrictHttpResponse<Array<OwnerNotificationsEntity>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `ownerNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ownerNotification(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Array<OwnerNotificationsEntity>> {

    return this.ownerNotification$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OwnerNotificationsEntity>>) => r.body as Array<OwnerNotificationsEntity>)
    );
  }

  /**
   * Path part for operation getAdminNotifications
   */
  static readonly GetAdminNotificationsPath = '/v1/notifications/getAllAdminNotifications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAdminNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminNotifications$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SuperAdminNotifications>>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.GetAdminNotificationsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SuperAdminNotifications>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAdminNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAdminNotifications(params?: {
    context?: HttpContext
  }
): Observable<Array<SuperAdminNotifications>> {

    return this.getAdminNotifications$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SuperAdminNotifications>>) => r.body as Array<SuperAdminNotifications>)
    );
  }

}
