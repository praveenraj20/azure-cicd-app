import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contracts, OnBoarding } from 'src/app/api/flexcub-api/models';
import { PoControllerService, SeekerMsaControllerService, SkillPartnerControllerService, SkillSeekerControllerService, StatementOfWorkControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  constructor(
    private readonly _partnerService: SkillPartnerControllerService,
    private readonly _seekerService: SkillSeekerControllerService,
    private readonly _msaService: SeekerMsaControllerService,
    private readonly _workerService: StatementOfWorkControllerService,
    private readonly _poService: PoControllerService) { }

  getContracts(id: number) {
    return this._partnerService.getContractDetails1({ partnerId: id });
  }

  getContractStatus() {
    return this._msaService.getContractStatus();
  }

  getContractDetails(id: number) {
    return this._seekerService.getListsOfContractDetails({ ownerId: id });
  }

  updateMsaStatus(id: number, statusId: number) {
    return this._msaService.updateMsaStatus({ msaId: id, msaStatusId: statusId });
  }

  updateSowStatus(id: number, statusId: number) {
    return this._workerService.updateSowStatus({ sowId: id, sowStatusId: statusId });
  }

  updatePOStatus(id: number, statusId: number) {
    return this._poService.updatePoStatus({ id: id, status: statusId });
  }

  downloadMsa(id: number) {
    return this._msaService.downloadOwnerAgreement1({ id: id });
  }

  downloadSow(id: number) {
    return this._workerService.downloadOwnerAgreement({ id: id });
  }

  downloadPo(id: number) {
    return this._poService.downloadAgreementPo({ id: id });
  }

  getSeekerContracts(id: number) {
    return this._seekerService.getContractDetails({ seekerId: id });
  }

  onBoarding(j: OnBoarding) {
    return this._seekerService.response({ body: j });
  }

  getAllContractDetails() {
    return this._seekerService.getAllContractDetails();
  }
}
