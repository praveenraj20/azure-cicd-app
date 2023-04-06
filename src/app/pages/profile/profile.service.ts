import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientEntity, FileResponse, SkillOwnerDto, SkillOwnerEntity, SkillOwnerGender, SkillOwnerSkillSet } from 'src/app/api/flexcub-api/models';
import { ClientControllerService, OwnerSkillDomainControllerService, OwnerSkillLevelAndExperienceControllerService, OwnerSkillLevelControllerService, OwnerSkillRolesControllerService, OwnerSkillSetControllerService, OwnerSkillTechnologiesControllerService, SeekerTechnologyControllerService, SkillOwnerControllerService, VisaStatusControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private readonly _ownerService: SkillOwnerControllerService,
    private readonly _clientService: ClientControllerService,
    private readonly _technologyService: OwnerSkillTechnologiesControllerService,
    private readonly _rolesService: OwnerSkillRolesControllerService,
    private readonly _levelService: OwnerSkillLevelControllerService,
    private readonly _domainService: OwnerSkillDomainControllerService,
    private readonly _experienceService: OwnerSkillLevelAndExperienceControllerService,
    private readonly _skillSetService: OwnerSkillSetControllerService,
    private readonly skillownercontroller: SkillOwnerControllerService,
    private readonly visaStatusControllerService: VisaStatusControllerService) { }

  insertProfile(id: number, image: Blob) {
    return this._ownerService.insertAttachment({ id: id, body: { image: image } });
  }

  insertResume(id: number, doc: Blob) {
    return this._ownerService.insertAttachment({ id: id, body: { resume: doc } });
  }

  insertDocument(id: number, doc: Blob[]) {
    return this._ownerService.insertAttachment({ id: id, body: { document: doc } });
  }

  insertFederal(id:number , doc:Blob){
    return this._ownerService.insertAttachment({id:id, body: {federal:doc} });
  }

  getOwnerInfo(id: number): Observable<SkillOwnerDto> {
    return this._ownerService.getById({ id: id });
  }

  getResumeFiles(id: number): Observable<FileResponse> {
    return this._ownerService.downloadResume({ ownerId: id });
  }

  getOtherFiles(id: number, count: number = 1): Observable<FileResponse> {
    return this._ownerService.otherFilesDownload({ ownerId: id, count: count });
  }

  getFederalFile(id:number):Observable<FileResponse>{
    return this._ownerService.downloadFederal({ ownerId: id });
  }

  deleteOtherFiles(id: number, i: number) {
    return this._ownerService.deletePortfolio1({ id: id, count: 1 });
  }

  deletePortfolio(id: number) {
    return this._ownerService.deletePortfolio({ id: id});
  }

  getGenderList(): Observable<SkillOwnerGender[]> {
    return this._ownerService.getGenderList();
  }

  updateOwnerProfile(j: SkillOwnerEntity): Observable<SkillOwnerDto> {
    return this._ownerService.updateOwnerProfile({ body: j });
  }

  getClientInfo(id: number) {
    return this._clientService.getSkillOwnerId({ ownerId: id });
  }

  saveClientInfo(j: Array<Client>): Observable<Array<Client>> {
    return this._clientService.insertClient({ body: j });
  }

  getTechnologies() {
    return this._technologyService.getDetailsTech();
  }

  getRoles() {
    return this._rolesService.getDetailsroles();
  }

  getLevels() {
    return this._levelService.getDetails1();
  }

  getDomains() {
    return this._domainService.getDetails2();
  }

  getExperience() {
    return this._experienceService.getOwnerSkillYearOfExperienceDetails();
  }

  addSkillSets(j: SkillOwnerSkillSet) {
    return this._skillSetService.insertDetails1({ body: j });
  }

  getMySkillSets(id: number) {
    return this._skillSetService.getDetails({ skillOwnerId: id });
  }

  deleteSkill(id: number) {
    return this._skillSetService.deleteDetails({ skillId: id });
  }

  saveSkillSet(j: SkillOwnerSkillSet) {
    return this._skillSetService.updateDetails({ body: j });
  }

  getVisa() {
    return this.visaStatusControllerService.getVisa();
  }
}
