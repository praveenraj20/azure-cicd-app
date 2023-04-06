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

import { AcceptRejectDto } from '../models/accept-reject-dto';
import { FeedbackRate } from '../models/feedback-rate';
import { FlowLockedDto } from '../models/flow-locked-dto';
import { InsertRequirementPhaseDto } from '../models/insert-requirement-phase-dto';
import { NewSlotRequestBySeekerDto } from '../models/new-slot-request-by-seeker-dto';
import { RateApprovalDto } from '../models/rate-approval-dto';
import { RejectCandidateDto } from '../models/reject-candidate-dto';
import { RequirementPhaseDetailsDto } from '../models/requirement-phase-details-dto';
import { RescheduleDto } from '../models/reschedule-dto';
import { ScheduleInterviewDto } from '../models/schedule-interview-dto';
import { SelectionPhase } from '../models/selection-phase';
import { SelectionPhaseDto } from '../models/selection-phase-dto';
import { SelectionPhaseResponse } from '../models/selection-phase-response';
import { SlotConfirmByOwnerDto } from '../models/slot-confirm-by-owner-dto';
import { SlotConfirmBySeekerDto } from '../models/slot-confirm-by-seeker-dto';
import { StageStatusDto } from '../models/stage-status-dto';
import { WorkFlowComponent } from '../models/work-flow-component';

@Injectable({
  providedIn: 'root',
})
export class SelectionPhaseControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateDetailsForParticularRound
   */
  static readonly UpdateDetailsForParticularRoundPath = '/v1/selectionPhase/updateDetailsForParticularRound';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDetailsForParticularRound()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetailsForParticularRound$Response(params: {
    context?: HttpContext
    body: RequirementPhaseDetailsDto
  }
): Observable<StrictHttpResponse<RequirementPhaseDetailsDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.UpdateDetailsForParticularRoundPath, 'put');
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
        return r as StrictHttpResponse<RequirementPhaseDetailsDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateDetailsForParticularRound$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDetailsForParticularRound(params: {
    context?: HttpContext
    body: RequirementPhaseDetailsDto
  }
): Observable<RequirementPhaseDetailsDto> {

    return this.updateDetailsForParticularRound$Response(params).pipe(
      map((r: StrictHttpResponse<RequirementPhaseDetailsDto>) => r.body as RequirementPhaseDetailsDto)
    );
  }

  /**
   * Path part for operation updateSlotBySkillOwner
   */
  static readonly UpdateSlotBySkillOwnerPath = '/v1/selectionPhase/slotsByOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSlotBySkillOwner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSlotBySkillOwner$Response(params: {
    context?: HttpContext
    body: SlotConfirmByOwnerDto
  }
): Observable<StrictHttpResponse<SlotConfirmByOwnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.UpdateSlotBySkillOwnerPath, 'put');
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
        return r as StrictHttpResponse<SlotConfirmByOwnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSlotBySkillOwner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSlotBySkillOwner(params: {
    context?: HttpContext
    body: SlotConfirmByOwnerDto
  }
): Observable<SlotConfirmByOwnerDto> {

    return this.updateSlotBySkillOwner$Response(params).pipe(
      map((r: StrictHttpResponse<SlotConfirmByOwnerDto>) => r.body as SlotConfirmByOwnerDto)
    );
  }

  /**
   * Path part for operation updateSlotConfirmedBySeeker
   */
  static readonly UpdateSlotConfirmedBySeekerPath = '/v1/selectionPhase/slotConfirmationBySeeker';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSlotConfirmedBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSlotConfirmedBySeeker$Response(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SlotConfirmBySeekerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.UpdateSlotConfirmedBySeekerPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SlotConfirmBySeekerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateSlotConfirmedBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateSlotConfirmedBySeeker(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<SlotConfirmBySeekerDto> {

    return this.updateSlotConfirmedBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<SlotConfirmBySeekerDto>) => r.body as SlotConfirmBySeekerDto)
    );
  }

  /**
   * Path part for operation selectedForRound
   */
  static readonly SelectedForRoundPath = '/v1/selectionPhase/selectedForRound';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `selectedForRound()` instead.
   *
   * This method doesn't expect any request body.
   */
  selectedForRound$Response(params: {
    jobId: string;
    skillOwnerId: number;
    stage: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<RequirementPhaseDetailsDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.SelectedForRoundPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
      rb.query('stage', params.stage, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RequirementPhaseDetailsDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `selectedForRound$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  selectedForRound(params: {
    jobId: string;
    skillOwnerId: number;
    stage: number;
    context?: HttpContext
  }
): Observable<RequirementPhaseDetailsDto> {

    return this.selectedForRound$Response(params).pipe(
      map((r: StrictHttpResponse<RequirementPhaseDetailsDto>) => r.body as RequirementPhaseDetailsDto)
    );
  }

  /**
   * Path part for operation scheduleInterview
   */
  static readonly ScheduleInterviewPath = '/v1/selectionPhase/scheduleInterview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `scheduleInterview()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scheduleInterview$Response(params: {
    context?: HttpContext
    body: ScheduleInterviewDto
  }
): Observable<StrictHttpResponse<StageStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.ScheduleInterviewPath, 'put');
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
        return r as StrictHttpResponse<StageStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `scheduleInterview$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  scheduleInterview(params: {
    context?: HttpContext
    body: ScheduleInterviewDto
  }
): Observable<StageStatusDto> {

    return this.scheduleInterview$Response(params).pipe(
      map((r: StrictHttpResponse<StageStatusDto>) => r.body as StageStatusDto)
    );
  }

  /**
   * Path part for operation rescheduleForRound
   */
  static readonly RescheduleForRoundPath = '/v1/selectionPhase/rescheduleForRound';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rescheduleForRound()` instead.
   *
   * This method doesn't expect any request body.
   */
  rescheduleForRound$Response(params: {
    jobId: string;
    skillOwnerId: number;
    stage: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<RescheduleDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.RescheduleForRoundPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
      rb.query('stage', params.stage, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RescheduleDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rescheduleForRound$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rescheduleForRound(params: {
    jobId: string;
    skillOwnerId: number;
    stage: number;
    context?: HttpContext
  }
): Observable<RescheduleDto> {

    return this.rescheduleForRound$Response(params).pipe(
      map((r: StrictHttpResponse<RescheduleDto>) => r.body as RescheduleDto)
    );
  }

  /**
   * Path part for operation rejectCandidate
   */
  static readonly RejectCandidatePath = '/v1/selectionPhase/rejectCandidate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejectCandidate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rejectCandidate$Response(params: {
    context?: HttpContext
    body: RejectCandidateDto
  }
): Observable<StrictHttpResponse<StageStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.RejectCandidatePath, 'put');
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
        return r as StrictHttpResponse<StageStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rejectCandidate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  rejectCandidate(params: {
    context?: HttpContext
    body: RejectCandidateDto
  }
): Observable<StageStatusDto> {

    return this.rejectCandidate$Response(params).pipe(
      map((r: StrictHttpResponse<StageStatusDto>) => r.body as StageStatusDto)
    );
  }

  /**
   * Path part for operation reInitiateHiring
   */
  static readonly ReInitiateHiringPath = '/v1/selectionPhase/reInitiateHiring';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reInitiateHiring()` instead.
   *
   * This method doesn't expect any request body.
   */
  reInitiateHiring$Response(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<StageStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.ReInitiateHiringPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StageStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `reInitiateHiring$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reInitiateHiring(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StageStatusDto> {

    return this.reInitiateHiring$Response(params).pipe(
      map((r: StrictHttpResponse<StageStatusDto>) => r.body as StageStatusDto)
    );
  }

  /**
   * Path part for operation skillOwnerRate
   */
  static readonly SkillOwnerRatePath = '/v1/selectionPhase/rateForSkillOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `skillOwnerRate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerRate$Response(params: {
    context?: HttpContext
    body: Array<RateApprovalDto>
  }
): Observable<StrictHttpResponse<Array<RateApprovalDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.SkillOwnerRatePath, 'put');
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
        return r as StrictHttpResponse<Array<RateApprovalDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `skillOwnerRate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  skillOwnerRate(params: {
    context?: HttpContext
    body: Array<RateApprovalDto>
  }
): Observable<Array<RateApprovalDto>> {

    return this.skillOwnerRate$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RateApprovalDto>>) => r.body as Array<RateApprovalDto>)
    );
  }

  /**
   * Path part for operation updateNewSlotBySeeker
   */
  static readonly UpdateNewSlotBySeekerPath = '/v1/selectionPhase/newSlotRequest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNewSlotBySeeker()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateNewSlotBySeeker$Response(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<NewSlotRequestBySeekerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.UpdateNewSlotBySeekerPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewSlotRequestBySeekerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateNewSlotBySeeker$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateNewSlotBySeeker(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<NewSlotRequestBySeekerDto> {

    return this.updateNewSlotBySeeker$Response(params).pipe(
      map((r: StrictHttpResponse<NewSlotRequestBySeekerDto>) => r.body as NewSlotRequestBySeekerDto)
    );
  }

  /**
   * Path part for operation acceptRejectBySkillOwner
   */
  static readonly AcceptRejectBySkillOwnerPath = '/v1/selectionPhase/acceptRejectBySkillOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `acceptRejectBySkillOwner()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  acceptRejectBySkillOwner$Response(params: {
    context?: HttpContext
    body: AcceptRejectDto
  }
): Observable<StrictHttpResponse<AcceptRejectDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.AcceptRejectBySkillOwnerPath, 'put');
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
        return r as StrictHttpResponse<AcceptRejectDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `acceptRejectBySkillOwner$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  acceptRejectBySkillOwner(params: {
    context?: HttpContext
    body: AcceptRejectDto
  }
): Observable<AcceptRejectDto> {

    return this.acceptRejectBySkillOwner$Response(params).pipe(
      map((r: StrictHttpResponse<AcceptRejectDto>) => r.body as AcceptRejectDto)
    );
  }

  /**
   * Path part for operation acceptInterview
   */
  static readonly AcceptInterviewPath = '/v1/selectionPhase/acceptInterview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `acceptInterview()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptInterview$Response(params: {
    jobId: string;
    ownerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<StageStatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.AcceptInterviewPath, 'put');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('ownerId', params.ownerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StageStatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `acceptInterview$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  acceptInterview(params: {
    jobId: string;
    ownerId: number;
    context?: HttpContext
  }
): Observable<StageStatusDto> {

    return this.acceptInterview$Response(params).pipe(
      map((r: StrictHttpResponse<StageStatusDto>) => r.body as StageStatusDto)
    );
  }

  /**
   * Path part for operation shortlistingMail
   */
  static readonly ShortlistingMailPath = '/v1/selectionPhase/sendMail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `shortlistingMail()` instead.
   *
   * This method doesn't expect any request body.
   */
  shortlistingMail$Response(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.ShortlistingMailPath, 'post');
    if (params) {
      rb.query('jobId', params.jobId, {});
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
   * To access the full response (for headers, for example), `shortlistingMail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  shortlistingMail(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.shortlistingMail$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation insertSelectionPhases
   */
  static readonly InsertSelectionPhasesPath = '/v1/selectionPhase/insertSelectionPhase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertSelectionPhases()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSelectionPhases$Response(params: {
    context?: HttpContext
    body: Array<SelectionPhaseDto>
  }
): Observable<StrictHttpResponse<Array<SelectionPhase>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.InsertSelectionPhasesPath, 'post');
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
        return r as StrictHttpResponse<Array<SelectionPhase>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertSelectionPhases$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertSelectionPhases(params: {
    context?: HttpContext
    body: Array<SelectionPhaseDto>
  }
): Observable<Array<SelectionPhase>> {

    return this.insertSelectionPhases$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SelectionPhase>>) => r.body as Array<SelectionPhase>)
    );
  }

  /**
   * Path part for operation insertRequirementPhases
   */
  static readonly InsertRequirementPhasesPath = '/v1/selectionPhase/insertRequirementPhases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertRequirementPhases()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertRequirementPhases$Response(params: {
    context?: HttpContext
    body: InsertRequirementPhaseDto
  }
): Observable<StrictHttpResponse<Array<SelectionPhaseResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.InsertRequirementPhasesPath, 'post');
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
        return r as StrictHttpResponse<Array<SelectionPhaseResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertRequirementPhases$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertRequirementPhases(params: {
    context?: HttpContext
    body: InsertRequirementPhaseDto
  }
): Observable<Array<SelectionPhaseResponse>> {

    return this.insertRequirementPhases$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SelectionPhaseResponse>>) => r.body as Array<SelectionPhaseResponse>)
    );
  }

  /**
   * Path part for operation insertUniversalSlot
   */
  static readonly InsertUniversalSlotPath = '/v1/selectionPhase/insertCommonSlotByOwner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertUniversalSlot()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertUniversalSlot$Response(params: {
    context?: HttpContext
    body: SlotConfirmByOwnerDto
  }
): Observable<StrictHttpResponse<SlotConfirmByOwnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.InsertUniversalSlotPath, 'post');
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
        return r as StrictHttpResponse<SlotConfirmByOwnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertUniversalSlot$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertUniversalSlot(params: {
    context?: HttpContext
    body: SlotConfirmByOwnerDto
  }
): Observable<SlotConfirmByOwnerDto> {

    return this.insertUniversalSlot$Response(params).pipe(
      map((r: StrictHttpResponse<SlotConfirmByOwnerDto>) => r.body as SlotConfirmByOwnerDto)
    );
  }

  /**
   * Path part for operation isLocked
   */
  static readonly IsLockedPath = '/v1/selectionPhase/isLocked';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isLocked()` instead.
   *
   * This method doesn't expect any request body.
   */
  isLocked$Response(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FlowLockedDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.IsLockedPath, 'get');
    if (params) {
      rb.query('jobId', params.jobId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FlowLockedDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `isLocked$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isLocked(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<FlowLockedDto> {

    return this.isLocked$Response(params).pipe(
      map((r: StrictHttpResponse<FlowLockedDto>) => r.body as FlowLockedDto)
    );
  }

  /**
   * Path part for operation workFlow
   */
  static readonly WorkFlowPath = '/v1/selectionPhase/getWorkFlow';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `workFlow()` instead.
   *
   * This method doesn't expect any request body.
   */
  workFlow$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<WorkFlowComponent>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.WorkFlowPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WorkFlowComponent>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `workFlow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  workFlow(params?: {
    context?: HttpContext
  }
): Observable<Array<WorkFlowComponent>> {

    return this.workFlow$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WorkFlowComponent>>) => r.body as Array<WorkFlowComponent>)
    );
  }

  /**
   * Path part for operation getSelectionPhase
   */
  static readonly GetSelectionPhasePath = '/v1/selectionPhase/getSlots';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSelectionPhase()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectionPhase$Response(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SlotConfirmByOwnerDto>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.GetSelectionPhasePath, 'get');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SlotConfirmByOwnerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSelectionPhase$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSelectionPhase(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<SlotConfirmByOwnerDto> {

    return this.getSelectionPhase$Response(params).pipe(
      map((r: StrictHttpResponse<SlotConfirmByOwnerDto>) => r.body as SlotConfirmByOwnerDto)
    );
  }

  /**
   * Path part for operation feedback
   */
  static readonly FeedbackPath = '/v1/selectionPhase/getFeedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `feedback()` instead.
   *
   * This method doesn't expect any request body.
   */
  feedback$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<FeedbackRate>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.FeedbackPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FeedbackRate>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `feedback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  feedback(params?: {
    context?: HttpContext
  }
): Observable<Array<FeedbackRate>> {

    return this.feedback$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FeedbackRate>>) => r.body as Array<FeedbackRate>)
    );
  }

  /**
   * Path part for operation getCandidatesByJobId
   */
  static readonly GetCandidatesByJobIdPath = '/v1/selectionPhase/getCandidates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCandidatesByJobId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidatesByJobId$Response(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SelectionPhaseResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.GetCandidatesByJobIdPath, 'get');
    if (params) {
      rb.query('jobId', params.jobId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SelectionPhaseResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCandidatesByJobId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCandidatesByJobId(params: {
    jobId: string;
    context?: HttpContext
  }
): Observable<Array<SelectionPhaseResponse>> {

    return this.getCandidatesByJobId$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SelectionPhaseResponse>>) => r.body as Array<SelectionPhaseResponse>)
    );
  }

  /**
   * Path part for operation candidateInterviewDetails
   */
  static readonly CandidateInterviewDetailsPath = '/v1/selectionPhase/candidateInterviewDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `candidateInterviewDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  candidateInterviewDetails$Response(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SelectionPhaseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SelectionPhaseControllerService.CandidateInterviewDetailsPath, 'get');
    if (params) {
      rb.query('jobId', params.jobId, {});
      rb.query('skillOwnerId', params.skillOwnerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SelectionPhaseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `candidateInterviewDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  candidateInterviewDetails(params: {
    jobId: string;
    skillOwnerId: number;
    context?: HttpContext
  }
): Observable<SelectionPhaseResponse> {

    return this.candidateInterviewDetails$Response(params).pipe(
      map((r: StrictHttpResponse<SelectionPhaseResponse>) => r.body as SelectionPhaseResponse)
    );
  }

}
