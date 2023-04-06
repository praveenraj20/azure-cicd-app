import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';

@Component({
  selector: 'app-partners-admin',
  templateUrl: './partners-admin.component.html',
  styleUrls: ['./partners-admin.component.scss']
})
export class PartnersAdminComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.ADMIN, ref: AdminListComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }


  ngOnInit(): void {
  }

}
