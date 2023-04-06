import { Injectable } from '@angular/core';
import { SeekerStatusUpdate, SubRole } from 'src/app/api/flexcub-api/models';
import { SeekerAdminControllerService, SkillSeekerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class EmployeesRoleService {

  constructor(
    private readonly _seekerService: SkillSeekerControllerService,
    private readonly _seekerAdminService: SeekerAdminControllerService) { }

  getAccessById(taxId: string) {
    return this._seekerService.getAccessById({ taxId: taxId });
  }

  getSubRoles() {
    return this._seekerService.getSubRoles();
  }

  getModules() {
    return this._seekerService.getModules();
  }

  addSubRole(j: SubRole) {
    return this._seekerService.addSubRole({ body: j });
  }

  getSeekerById(taxId: string) {
    return this._seekerService.getSeekerById({ taxId: taxId });
  }

  updateSeekerStatus(j: SeekerStatusUpdate) {
    return this._seekerAdminService.updateSeekerStatus({ body: j });
  }

  addSubRoleToSeeker(seekerId: number, roleId: number) {
    return this._seekerService.addSeekerSubRoles({ skillSeekerId: seekerId, role: roleId });
  }
}
