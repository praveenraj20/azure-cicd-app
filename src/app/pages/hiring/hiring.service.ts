import { Injectable } from '@angular/core';
import { OwnerRateUpdate, OwnerStatusUpdate } from 'src/app/api/flexcub-api/models';
import { NotificationControllerService, SkillOwnerControllerService, SkillPartnerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class HiringService {

  constructor(
    private readonly _notificationService: NotificationControllerService,
    private readonly _skillPartnerService: SkillPartnerControllerService,
    private readonly _skillOwnerService: SkillOwnerControllerService) { }

  getOwners(id: number) {
    return this._notificationService.getOwnerDetailsInPartner({ partnerId: id });
  }

  skillOwnerStatusUpdate(j: OwnerStatusUpdate) {
    return this._skillPartnerService.skillOwnerStatusUpdate({ body: j });
  }

  getJobHistoryInSeeker(id: number) {
    return this._notificationService.getJobHistoryInSeeker({ ownerId: id });
  }

  historyOfJobs(id:number) {
    return this._notificationService.historyOfJobs({ ownerId: id });
  }

  getSkillOwner(id: number) {
    return this._skillOwnerService.getById({ id: id });
  }

  getNotificationForParticularOwner(id: number, jobId: string) {
    return this._notificationService.getNotificationForParticularOwner({ ownerId: id, jobId: jobId });
  }

  skillOwnerRateUpdate(j:OwnerRateUpdate) {
    return this._skillPartnerService.skillOwnerRateUpdate({ body: j });
  }
}
