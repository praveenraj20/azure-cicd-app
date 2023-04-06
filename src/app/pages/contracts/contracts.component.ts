import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { AdminContractsComponent } from './admin/admin-contracts/admin-contracts.component';
import { PartnerContractsComponent } from './partner/partner-contracts/partner-contracts.component';
import { SeekerContractsComponent } from './seeker/seeker-contracts/seeker-contracts.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {
    const j = [
      { role: ERole.PARTNER, ref: PartnerContractsComponent },
      { role: ERole.SEEKER, ref: SeekerContractsComponent },
      { role: ERole.ADMIN, ref: AdminContractsComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    i > -1 ? this.component = j[i].ref : null;
  }

  ngOnInit(): void { }

}
