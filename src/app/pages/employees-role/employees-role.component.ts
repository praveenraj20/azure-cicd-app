import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ERole } from 'src/app/core/models';
import { UnauthorizedComponent } from '../shared';
import { SeekerEmployeeRoleComponent } from './seeker/seeker-employee-role/seeker-employee-role.component';

@Component({
  selector: 'app-employees-role',
  templateUrl: './employees-role.component.html',
  styleUrls: ['./employees-role.component.scss']
})
export class EmployeesRoleComponent implements OnInit {
  component!: any;

  constructor(
    private readonly _appService: AppService) {

    const j = [
      { role: ERole.SEEKER, ref: SeekerEmployeeRoleComponent },
    ];

    const i = j.findIndex(e => e?.role === this._appService.user?.roles?.rolesId) ?? -1;
    this.component = i > -1 ? j[i].ref : UnauthorizedComponent;
  }

  ngOnInit(): void { }

}
