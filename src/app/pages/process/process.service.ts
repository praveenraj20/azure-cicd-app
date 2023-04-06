import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackRate, InsertRequirementPhaseDto, RateApprovalDto, RejectCandidateDto, RequirementPhaseDetailsDto, SelectionPhaseDto, SelectionPhaseResponse } from 'src/app/api/flexcub-api/models';
import { FileReadingControllerService, LocationControllerService, PoControllerService, SeekerAdminControllerService, SeekerMsaControllerService, SeekerProjectControllerService, SelectionPhaseControllerService, SkillOwnerControllerService, StatementOfWorkControllerService, TalentRecommendationControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  constructor(
    private readonly seekerMsaController: SeekerMsaControllerService,
    private readonly _selectionService: SelectionPhaseControllerService,
    private readonly _locationService: LocationControllerService,
    private readonly _ownerService: SkillOwnerControllerService,
    private readonly seekerProjectController: SeekerProjectControllerService,
    private readonly seekerAdminController: SeekerAdminControllerService,
    private readonly selectionPhaseController: SelectionPhaseControllerService,
    private readonly skillOwnerController: SkillOwnerControllerService,
    private readonly poController: PoControllerService,
    private readonly statementOfWorkController: StatementOfWorkControllerService,
    private readonly _fileService: FileReadingControllerService,
    private readonly _talentService: TalentRecommendationControllerService) { }

  getMsaDetailsBySeeker(skillSeekerId: number) {
    return this.seekerMsaController.getMsaDetailsBySeeker({
      skillSeekerId: skillSeekerId,
    });
  }

  getMsaTemplate() {
    return this.seekerMsaController.getSkillSeekerMsaTemplate$Pdf();
  }

  downloadAgreement(id: number) {
    return this.seekerMsaController.downloadAgreement({ id: id });
  }

  talentRecommendation(jobId: string) {
    return this._talentService.talentRecommendation({ jobId: jobId });
  }

  getCandidatesByJobId(jobId: string) {
    return this._selectionService.getCandidatesByJobId({ jobId: jobId });
  }

  getById(id: number) {
    return this._ownerService.getById({ id: id });
  }

  skillOwnerRate(n: RateApprovalDto[]) {
    return this._selectionService.skillOwnerRate({ body: n });
  }

  insertSelectionPhases(n: SelectionPhaseDto[]) {
    return this._selectionService.insertSelectionPhases({ body: n });
  }

  shortlistingMail(jobId: string) {
    return this._selectionService.shortlistingMail({ jobId: jobId });
  }

  isLocked(jobId: string) {
    return this._selectionService.isLocked({ jobId: jobId });
  }

  insertRequirementPhases(j: InsertRequirementPhaseDto) {
    return this._selectionService.insertRequirementPhases({ body: j });
  }

  interviewInfo(jobId: string, skillOwnerId: number) {
    return this._selectionService.candidateInterviewDetails({
      jobId: jobId,
      skillOwnerId: skillOwnerId,
    });
  }

  updateDetailsForParticularRound(j: RequirementPhaseDetailsDto) {
    return this._selectionService.updateDetailsForParticularRound({ body: j });
  }


  reInitiateHiring(jobId: string, skillOwnerId: number) {
    return this._selectionService.reInitiateHiring({
      jobId: jobId,
      skillOwnerId: skillOwnerId,
    });
  }

  rejectCandidate(j: RejectCandidateDto) {
    return this._selectionService.rejectCandidate({ body: j });
  }

  acceptInterview(jobId: string, ownerId: number) {
    return this._selectionService.acceptInterview({
      jobId: jobId,
      ownerId: ownerId,
    });
  }

  selectedForRound(jobId: string, skillOwnerId: number, stage: number) {
    return this._selectionService.selectedForRound({
      jobId: jobId,
      skillOwnerId: skillOwnerId,
      stage: stage,
    });
  }

  rescheduleForRound(jobId: string, skillOwnerId: number, stage: number) {
    return this._selectionService.rescheduleForRound({
      jobId: jobId,
      skillOwnerId: skillOwnerId,
      stage: stage,
    });
  }

  uploadFile(
    skillSeekerId: number,
    skillSeekerProjectId: number,
    jobId: string,
    ownerId: number,
    agreefile: Blob[]
  ) {
    return this.seekerMsaController.uploadFile1({
      skillSeekerId: skillSeekerId,
      skillSeekerProjectId: skillSeekerProjectId,
      jobId: jobId,
      ownerId: ownerId,
      body: { document: agreefile },
    });
  }

  uploadFileSOW(
    ownerId: number,
    skillSeekerId: number,
    domainId: number,
    roles: string,
    skillSeekerProjectId: number,
    jobId: string,
    sowfile: Blob[]
  ) {
    return this.statementOfWorkController.uploadFile({
      ownerId: ownerId,
      skillSeekerId: skillSeekerId,
      domainId: domainId,
      roles: roles,
      skillSeekerProjectId: skillSeekerProjectId,
      jobId: jobId,
      body: { document: sowfile },
    });
  }

  getSowTemplate() {
    return this.statementOfWorkController.getSowTemplate$Pdf();
  }

  getProjectDropdownData(id: number) {
    return this.seekerProjectController.seekerProjectDetails({
      skillSeekerId: id,
    });
  }

  skillSeekerByAdmin() {
    return this.seekerAdminController.skillSeekerByAdmin();
  }

  candidateInterviewDetails(
    jobId: string,
    skillOwnerId: number
  ): Observable<SelectionPhaseResponse> {
    return this.selectionPhaseController.candidateInterviewDetails({
      jobId: jobId,
      skillOwnerId: skillOwnerId,
    });
  }

  getSowDetails(skillSeekerId: number) {
    return this.statementOfWorkController.getSowDetails({
      skillSeekerId: skillSeekerId,
    });
  }

  downloadImage(Id: number) {
    return this.skillOwnerController.downloadImage({ id: Id });
  }

  uploadFilePO(
    skillSeekerId: number,
    skillSeekerProjectId: number,
    skillOwnerId: number,
    Role: string,
    Domain: number,
    JobId: string,
    profile: Blob[]
  ) {
    return this.poController.uploadFile2({
      skillSeekerId: skillSeekerId,
      skillSeekerProjectId: skillSeekerProjectId,
      skillOwnerId: skillOwnerId,
      Role: Role,
      Domain: Domain,
      JobId: JobId,
      body: { document: profile },
    });
  }

  getPoDetails(skillSeekerId: number) {
    return this.poController.getPoDetails({ skillSeekerId: skillSeekerId });
  }

  getPoTemplate() {
    return this.poController.getProductOwnerTemplate();
  }

  feedback(): Observable<Array<FeedbackRate>> {
    return this.selectionPhaseController.feedback();
  }
  
  downloadTemplate() {
    return this._fileService.downloadTemplate();
  }
}
