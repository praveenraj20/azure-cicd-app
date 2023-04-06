import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { routing } from './notification.routing';
import { MaterialModule } from 'src/app/material.module';
import { PartnerComponent } from './feature/partner/partner.component';
import { OwnerComponent } from './feature/owner/owner.component';
import { SeekerComponent } from './feature/seeker/seeker.component';
import { SharedModule } from '../shared';
import { FeatureJobNotificationsComponent } from './feature-job-notifications/feature-job-notifications.component';
import { OwnerNotificationComponent } from './feature-job-notifications/owner-notification/owner-notification.component';
import { PartnerNotificationComponent } from './feature-job-notifications/partner-notification/partner-notification.component';
import { SeekerNotificationComponent } from './feature-job-notifications/seeker-notification/seeker-notification.component';



@NgModule({
  declarations: [
    NotificationsComponent,
    PartnerComponent,
    OwnerComponent,
    SeekerComponent,
    FeatureJobNotificationsComponent,
    OwnerNotificationComponent,
    PartnerNotificationComponent,
    SeekerNotificationComponent,
  ],
  imports: [
    CommonModule,
    routing,
    MaterialModule,
    SharedModule
  ]
})
export class NotificationsModule { }
