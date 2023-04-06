import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration, SeekerRoleListing, SubRoles } from 'src/app/api/flexcub-api/models';
import { AppService } from 'src/app/app.service';
import { EmployeesRoleService } from '../../employees-role.service';

@Component({
  selector: 'app-seeker-employee-role',
  templateUrl: './seeker-employee-role.component.html',
  styleUrls: ['./seeker-employee-role.component.scss']
})
export class SeekerEmployeeRoleComponent implements OnInit {
  user: Registration;
  pageOptions = { length: 0, size: 10, sizeOptions: [5, 10, 25, 100] };
  roles: SeekerRoleListing[] = [];
  subroles: SubRoles[] = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _service: EmployeesRoleService,
    private readonly router: Router) {
    this.user = this._appService.user;
  }

  ngOnInit(): void {
    this.getRoles();
    this.getSubRoles();
  }

  getRoles(): void {
    const taxId = this.user?.taxIdBusinessLicense;
    if (!taxId) return;

    this._service.getAccessById(taxId)
      .subscribe((j) => {
        this.roles = j;
        this.roles?.splice(0, 0, {
          roleId: 'RID-01',
          roleName: 'Admin',
          accessList: [{ id: 0, seekerModule: 'All' }],
          status: true,
        });
        this.roles?.forEach(e => {
          const k = [] as string[];
          e?.accessList?.forEach(n => k.push(n?.seekerModule as string));
          (e as any)['accessModules'] = k.join(', ');
        });
      }, (err) => { });
  }

  getSubRoles(): void {
    this._service.getSubRoles()
      .subscribe((j) => {
        this.subroles = j;
      }, (err) => { })
  }

  edit(n: SeekerRoleListing): void {
    let roleId = 0;
    const moduleId = [] as number[];
    this.subroles.forEach(e => {
      e?.subRoleDescription === n?.roleName ? roleId = e?.id as number : null;
    });
    n?.accessList?.forEach(e => moduleId.push(e?.id as number));
    this.router.navigate(['/employees-role/add'], {
      queryParams: { roleId: roleId, moduleId: moduleId, status: n.status ? 1 : 0 },
    });
  }

}
