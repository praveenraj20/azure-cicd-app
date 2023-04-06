import { Injectable } from '@angular/core';
import { SkillPartner, SkillSeeker } from 'src/app/api/flexcub-api/models';
import { SeekerAdminControllerService, SkillPartnerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class PartnersAdminService {

  constructor(
    private readonly _adminService: SeekerAdminControllerService,
    private readonly _skillPartnerService: SkillPartnerControllerService,
  ) { }

  getAllSkillPartner() {
    return this._adminService.getAllSkillPartner();
  }

  addClientDetails(request:SkillSeeker) {
    return this._adminService.addClientDetails({ body: request });
  }
  updateSkillPartnerDetails(req:SkillPartner) {
    return this._skillPartnerService.updateSkillPartnerDetails({ body: req });
  }

  getPartnerInfo(id: number) {
    return this._skillPartnerService.getPartnerDetails({ id: id });
  }
}
