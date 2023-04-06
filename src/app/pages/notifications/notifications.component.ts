import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../shared';
import { OwnerComponent } from './feature/owner/owner.component';
import { PartnerComponent } from './feature/partner/partner.component';
import { SeekerComponent } from './feature/seeker/seeker.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.PARTNER, ref: PartnerComponent },
      { role: ERole.OWNER, ref: OwnerComponent },
      { role: ERole.SEEKER, ref: SeekerComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }

  ngOnInit(): void { }

}
