import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { SeekerRequirement, SkillSeeker, SkillSeekerProject } from 'src/app/api/flexcub-api/models';
import { JobControllerService, OwnerSkillDomainControllerService, SeekerAdminControllerService, SeekerProjectControllerService, SeekerRequirementControllerService, SkillSeekerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class SeekersService {

  constructor(
    private readonly _adminService: SeekerAdminControllerService,
    private readonly _projectService: SeekerProjectControllerService,
    private readonly _ownerSkillService: OwnerSkillDomainControllerService,
    private readonly _jobService: JobControllerService,
    private readonly _seekerService: SkillSeekerControllerService,
    private readonly _requirementService: SeekerRequirementControllerService) { }

  skillSeekerByAdmin() {
    return this._adminService.skillSeekerByAdmin()
      .pipe(
        // tap(e => e?.sort((m, n) => (m?.id as number) > (n?.id as number) ? 1 : -1))
      );
  }

  addSeeker(j: SkillSeeker) {
    return this._adminService.addClientDetails({ body: j });
  }

  updateSeeker(j: SkillSeeker) {
    return this._adminService.updateClientDetails1({ body: j });
  }

  getSeekerInfo(id: number) {
    return this._adminService.skillSeekerBasicDetail({ id: id });
  }

  getProjectsInfo(id: number) {
    return this._projectService.seekerProjectDetails({ skillSeekerId: id })
      .pipe(map(e => e?.filter(n => n?.id)));
  }

  addProjects(data: SkillSeekerProject[]) {
    return this._projectService.insertSeekerProjectDetails({ body: data });
  }

  getHiringPriority() {
    return this._jobService.getHiringPriority();
  }

  getSeekers() {
    return this._adminService.skillSeekerByAdmin();
  }

  getJobDetails(id: number) {
    return this._requirementService.getRequirementDetails({ skillSeekerId: id });
  }

  getLocation(text: string) {
    return this._seekerService.getLocationByKeyword({ keyword: text });
  }

  insertRequirementDetailsData(j: SeekerRequirement[]) {
    return this._requirementService.insertRequirementDetailsData({ body: j });
  }
}
