import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { DEFAULT_AVATAR } from 'src/app/core/constants/constant';
import { ERole, Role } from 'src/app/core/models';

@Component({
  selector: 'ng-additionals',
  templateUrl: './ng-additionals.component.html',
  styleUrls: ['./ng-additionals.component.scss']
})
export class NgAdditionalsComponent implements OnInit {
  user: Registration;
  role!: string;
  avatar: string = DEFAULT_AVATAR;

  constructor(private readonly _appService: AppService) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this._appService.defaultAvatar(this.user?.id ?? 0).then((ii) => this.avatar = ii);
    const k = [
      { role: ERole.ADMIN, label: 'Super Admin' },
      { role: ERole.PARTNER, label: 'Skill Partner' },
      { role: ERole.OWNER, label: 'Skill Owner' },
      { role: ERole.SEEKER, label: 'Skill Seeker' },
    ];
    const i = k.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.role = i > -1 ? k[i].label : '';
  }

  logout(): void {
    this._appService.logout();
  }

}
