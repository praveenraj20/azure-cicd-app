import { Injectable } from '@angular/core';
import { NotificationControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly _notificationService: NotificationControllerService) { }

  getNotificationForParticularOwner(id: number, jobId: string) {
    return this._notificationService.getNotificationForParticularOwner({ ownerId: id, jobId: jobId });
  }

  getSeekerNotificationByOwner(id: number, jobId: string) {
    return this._notificationService.getSeekerNotificationByOwner({ ownerId: id, jobId: jobId });
  }

  getOwnerNotification(id: number) {
    return this._notificationService.ownerNotification({ id: id });
  }

  partnerNotification(id:number) {
    return this._notificationService.partnerNotification({ id: id });
  }

  getSeekerNotification(id: number) {
    return this._notificationService.seekerNotification({ id: id });
  }

  getPartnerNotification(Id:number) {
    return this._notificationService.partnerNotification({ id: Id });
  }

  getJobSpecificNotificationForOwner(id: number, jobId: string) {
    return this._notificationService.getJobSpecificNotificationForOwner({ skillOwnerId: id, jobId: jobId });
  }
  seekerMarkAsRead(id:number) {
    return this._notificationService.seekerMarkAsRead({ id: id });
  }

  partnerMarkAsRead(id:number) {
    return this._notificationService.partnerMarkAsRead({ id: id });
  }

  ownerMarkAsRead(id:number) {
    return this._notificationService.ownerMarkAsRead({ id: id });
  }
}
