import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcceptRejectDto, RequirementPhaseDetailsDto, SelectionPhaseResponse, SlotConfirmByOwnerDto, SlotConfirmBySeekerDto } from 'src/app/api/flexcub-api/models';
import { NotificationControllerService, SelectionPhaseControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private readonly _notificationService: NotificationControllerService,
    private readonly _selectionService: SelectionPhaseControllerService,) { }

  getLastFiveNotificationOfOwner(id: number) {
    return this._notificationService.getLastFiveNotificationOfOwner({ ownerId: id });
  }

  ownerMarkAsRead(id: number): Observable<boolean> {
    return this._notificationService.ownerMarkAsRead({ id: id });
  }

  candidateInterviewDetails(jobId: string, skillOwnerId: number): Observable<SelectionPhaseResponse> {
    return this._selectionService.candidateInterviewDetails({ jobId: jobId, skillOwnerId: skillOwnerId });
  }

  updateSlotConfirmedBySeeker(jobId:string, skillOwnerId:number): Observable<SlotConfirmBySeekerDto> {
    return this._selectionService.updateSlotConfirmedBySeeker({ jobId: jobId, skillOwnerId: skillOwnerId });
  }
  acceptInterview(jobId: string, ownerId: number) {
    return this._selectionService.acceptInterview({ jobId: jobId, ownerId: ownerId });
  }

  updateDetailsForParticularRound(req:RequirementPhaseDetailsDto) {
    return this._selectionService.updateDetailsForParticularRound({ body: req });
  }
  acceptRejectBySkillOwner(request: AcceptRejectDto): Observable<AcceptRejectDto> {
    return this._selectionService.acceptRejectBySkillOwner({ body: request });
  }

  getPartnerLastFiveNotification(id: number) {
    return this._notificationService.getLastFiveNotificationOfPartner({ partnerId: id });
  }

  partnerMarkAsRead(id: number): Observable<boolean> {
    return this._notificationService.partnerMarkAsRead({ id: id });
  }

  getSeekerLastFiveNotification(id: number) {
    return this._notificationService.getSeekerLastFiveNotification({ seekerId: id });
  }

  seekerMarkAsRead(id: number): Observable<boolean> {
    return this._notificationService.seekerMarkAsRead({ id: id });
  }

  insertUniversalSlot(j: SlotConfirmByOwnerDto) {
    return this._selectionService.insertUniversalSlot({ body: j });
  }

  updateSlotBySkillOwner(j: SlotConfirmByOwnerDto): Observable<SlotConfirmByOwnerDto> {
    return this._selectionService.updateSlotBySkillOwner({ body: j });
  }
}
