import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { AdminComponent } from './feature/admin/admin.component';
import { OwnerComponent } from './feature/owner/owner.component';
import { PartnerComponent } from './feature/partner/partner.component';
import { SeekerComponent } from './feature/seeker/seeker.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.ADMIN, ref: AdminComponent },
      { role: ERole.OWNER, ref: OwnerComponent },
      { role: ERole.PARTNER, ref: PartnerComponent },
      { role: ERole.SEEKER, ref: SeekerComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    i > -1 ? this.component = j[i].ref : null;
  }

  ngOnInit(): void {
  }

}
