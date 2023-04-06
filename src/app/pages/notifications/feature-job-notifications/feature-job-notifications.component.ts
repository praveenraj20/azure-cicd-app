import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../../shared';
import { OwnerNotificationComponent } from './owner-notification/owner-notification.component';
import { PartnerNotificationComponent } from './partner-notification/partner-notification.component';
import { SeekerNotificationComponent } from './seeker-notification/seeker-notification.component';

@Component({
  selector: 'app-feature-job-notifications',
  templateUrl: './feature-job-notifications.component.html',
  styleUrls: ['./feature-job-notifications.component.scss']
})
export class FeatureJobNotificationsComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.PARTNER, ref: PartnerNotificationComponent },
      { role: ERole.OWNER, ref: OwnerNotificationComponent },
      { role: ERole.SEEKER, ref: SeekerNotificationComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }

  ngOnInit(): void { }

}