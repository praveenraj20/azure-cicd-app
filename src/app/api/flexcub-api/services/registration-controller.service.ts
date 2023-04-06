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

import { ChangePasswordDto } from '../models/change-password-dto';
import { Login } from '../models/login';
import { Registration } from '../models/registration';
import { RegistrationEntity } from '../models/registration-entity';
import { SetOwnerPassword } from '../models/set-owner-password';
import { SkillOwnerEntity } from '../models/skill-owner-entity';
import { Verify } from '../models/verify';
import { WorkForceStrength } from '../models/work-force-strength';

@Injectable({
  providedIn: 'root',
})
export class RegistrationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation setPasswordForOwner
   */
  static readonly SetPasswordForOwnerPath = '/v1/registration/setOwnerPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setPasswordForOwner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setPasswordForOwner$Response(params: {
    context?: HttpContext
    body: SetOwnerPassword
  }
): Observable<StrictHttpResponse<Registration>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.SetPasswordForOwnerPath, 'put');
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
        return r as StrictHttpResponse<Registration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setPasswordForOwner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setPasswordForOwner(params: {
    context?: HttpContext
    body: SetOwnerPassword
  }
): Observable<Registration> {

    return this.setPasswordForOwner$Response(params).pipe(
      map((r: StrictHttpResponse<Registration>) => r.body as Registration)
    );
  }

  /**
   * Path part for operation resendMail
   */
  static readonly ResendMailPath = '/v1/registration/reSendMail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendMail()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendMail$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.ResendMailPath, 'put');
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
   * To access the full response (for headers, for example), `resendMail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendMail(params: {
    id: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.resendMail$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation verifyCandidate
   */
  static readonly VerifyCandidatePath = '/v1/registration/verify';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyCandidate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyCandidate$Response(params: {
    context?: HttpContext
    body: Verify
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.VerifyCandidatePath, 'post');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verifyCandidate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyCandidate(params: {
    context?: HttpContext
    body: Verify
  }
): Observable<{
}> {

    return this.verifyCandidate$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation verifyForgotPass
   */
  static readonly VerifyForgotPassPath = '/v1/registration/verifyForgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyForgotPass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyForgotPass$Response(params: {
    context?: HttpContext
    body: ChangePasswordDto
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.VerifyForgotPassPath, 'post');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verifyForgotPass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyForgotPass(params: {
    context?: HttpContext
    body: ChangePasswordDto
  }
): Observable<{
}> {

    return this.verifyForgotPass$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation superAdminLoginScreen
   */
  static readonly SuperAdminLoginScreenPath = '/v1/registration/superAdminLoginScreen';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `superAdminLoginScreen()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  superAdminLoginScreen$Response(params: {
    context?: HttpContext
    body: Login
  }
): Observable<StrictHttpResponse<Registration>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.SuperAdminLoginScreenPath, 'post');
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
        return r as StrictHttpResponse<Registration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `superAdminLoginScreen$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  superAdminLoginScreen(params: {
    context?: HttpContext
    body: Login
  }
): Observable<Registration> {

    return this.superAdminLoginScreen$Response(params).pipe(
      map((r: StrictHttpResponse<Registration>) => r.body as Registration)
    );
  }

  /**
   * Path part for operation getLoginDetails
   */
  static readonly GetLoginDetailsPath = '/v1/registration/loginScreen';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoginDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getLoginDetails$Response(params: {
    context?: HttpContext
    body: Login
  }
): Observable<StrictHttpResponse<Registration>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.GetLoginDetailsPath, 'post');
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
        return r as StrictHttpResponse<Registration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLoginDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getLoginDetails(params: {
    context?: HttpContext
    body: Login
  }
): Observable<Registration> {

    return this.getLoginDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Registration>) => r.body as Registration)
    );
  }

  /**
   * Path part for operation sendMailForFailedOwnerRegistrations
   */
  static readonly SendMailForFailedOwnerRegistrationsPath = '/v1/registration/failedOwnerRegistration';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMailForFailedOwnerRegistrations()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMailForFailedOwnerRegistrations$Response(params: {
    failedMap: {
[key: string]: Array<string>;
};
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.SendMailForFailedOwnerRegistrationsPath, 'post');
    if (params) {
      rb.query('failedMap', params.failedMap, {});
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
   * To access the full response (for headers, for example), `sendMailForFailedOwnerRegistrations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMailForFailedOwnerRegistrations(params: {
    failedMap: {
[key: string]: Array<string>;
};
    context?: HttpContext
  }
): Observable<void> {

    return this.sendMailForFailedOwnerRegistrations$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation insertDetails
   */
  static readonly InsertDetailsPath = '/v1/registration/createAccount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails$Response(params: {
    context?: HttpContext
    body: RegistrationEntity
  }
): Observable<StrictHttpResponse<Registration>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.InsertDetailsPath, 'post');
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
        return r as StrictHttpResponse<Registration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertDetails(params: {
    context?: HttpContext
    body: RegistrationEntity
  }
): Observable<Registration> {

    return this.insertDetails$Response(params).pipe(
      map((r: StrictHttpResponse<Registration>) => r.body as Registration)
    );
  }

  /**
   * Path part for operation changePassword
   */
  static readonly ChangePasswordPath = '/v1/registration/changePassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: {
    context?: HttpContext
    body: ChangePasswordDto
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.ChangePasswordPath, 'post');
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
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: {
    context?: HttpContext
    body: ChangePasswordDto
  }
): Observable<boolean> {

    return this.changePassword$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation verifyRegistrationForOwner
   */
  static readonly VerifyRegistrationForOwnerPath = '/v1/registration/verifyOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyRegistrationForOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyRegistrationForOwner$Response(params: {
    token: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SkillOwnerEntity>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.VerifyRegistrationForOwnerPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
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
   * To access the full response (for headers, for example), `verifyRegistrationForOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  verifyRegistrationForOwner(params: {
    token: string;
    context?: HttpContext
  }
): Observable<SkillOwnerEntity> {

    return this.verifyRegistrationForOwner$Response(params).pipe(
      map((r: StrictHttpResponse<SkillOwnerEntity>) => r.body as SkillOwnerEntity)
    );
  }

  /**
   * Path part for operation getStrength
   */
  static readonly GetStrengthPath = '/v1/registration/getStrengthTable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStrength()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStrength$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<WorkForceStrength>>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.GetStrengthPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WorkForceStrength>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getStrength$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStrength(params?: {
    context?: HttpContext
  }
): Observable<Array<WorkForceStrength>> {

    return this.getStrength$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WorkForceStrength>>) => r.body as Array<WorkForceStrength>)
    );
  }

  /**
   * Path part for operation setForgotPassword
   */
  static readonly SetForgotPasswordPath = '/v1/registration/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setForgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  setForgotPassword$Response(params: {
    emailId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationControllerService.SetForgotPasswordPath, 'get');
    if (params) {
      rb.query('emailId', params.emailId, {});
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
   * To access the full response (for headers, for example), `setForgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setForgotPassword(params: {
    emailId: string;
    context?: HttpContext
  }
): Observable<boolean> {

    return this.setForgotPassword$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

}
