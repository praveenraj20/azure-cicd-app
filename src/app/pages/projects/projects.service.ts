import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectTaskDetails, SkillSeekerProject, SkillSeekerTask } from 'src/app/api/flexcub-api/models';
import { OwnerSkillDomainControllerService, SeekerProjectControllerService, SeekerTaskControllerService, SkillSeekerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private readonly ownerSkillDomainController: OwnerSkillDomainControllerService,
    private readonly seekerProjectController: SeekerProjectControllerService,
    private readonly skillSeekerController: SkillSeekerControllerService,
    private readonly seekerTaskController: SeekerTaskControllerService,
  ) { }

  getDomainList() {
    return this.ownerSkillDomainController.getDetails2();
  }

  addNewSkillSeekarData(data: any): Observable<Array<SkillSeekerProject>> {
    return this.seekerProjectController.insertSeekerProjectDetails({ body: data });
  }

  getSeekerProjectDetails(id: number) {
    return this.seekerProjectController.seekerProjectDetails({ skillSeekerId: id });
  }

  getProjectTaskDetailsBySeeker(id: number): Observable<ProjectTaskDetails> {
    return this.skillSeekerController.getProjectTaskDetailsBySeeker({ skillSeekerId: id });
  }

  insertSeekerTaskDetails(data: any): Observable<Array<SkillSeekerTask>> {
    return this.seekerTaskController.insertSeekerTaskDetails({ body: data });
  }

  updateSeekerTaskDetails(data: any): Observable<SkillSeekerTask> {
    return this.seekerTaskController.updateSeekerTaskDetails({ body: data });
  }

  seekerTaskDetails(Id: number, skillseekerId: number): Observable<Array<SkillSeekerTask>> {
    return this.seekerTaskController.seekerTaskDetails({ projectId: Id, skillSeekerId: skillseekerId });
  }

  getDepatmentData(): Observable<any> {
    return this.ownerSkillDomainController.getDetails2();
  }

  deleteSeekerTaskDetails(Id: number) {
    return this.seekerTaskController.deleteSeekerTaskDetails({ id: Id });
  }

  updateSeekerProjectDetails(data: any): Observable<SkillSeekerProject> {
    return this.seekerProjectController.updateSeekerProjectDetails({ body: data });
  }
    
}
