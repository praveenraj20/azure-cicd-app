import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job, JobDto } from 'src/app/api/flexcub-api/models';
import { JobControllerService, NotificationControllerService, OwnerSkillDomainControllerService, OwnerSkillLevelAndExperienceControllerService, OwnerSkillTechnologiesControllerService, SeekerProjectControllerService, SkillOwnerControllerService, SkillSeekerControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(
    private readonly jobController: JobControllerService,
    private readonly skillSeekerController: SkillSeekerControllerService,
    private readonly seekerProjectController: SeekerProjectControllerService,
    private readonly ownerSkillTechnologiesController: OwnerSkillTechnologiesControllerService,
    private readonly ownerSkillDomainController: OwnerSkillDomainControllerService,
    private readonly ownerSkillLevelAndExperienceController: OwnerSkillLevelAndExperienceControllerService,
    private readonly skillownerController:SkillOwnerControllerService,
    private readonly notificationController:NotificationControllerService,
  ) { }

  getRetrieveJob(Id: number) {
    return this.jobController.getJobDetails({ seekerId: Id });
  }

  getLocation(text: string) {
    return this.skillSeekerController.getLocationByKeyword({ keyword: text });
  }

  getTechnologyList() {
    return this.ownerSkillTechnologiesController.getDetailsTech();
  }

  getSeekerProjectDetails(id: number) {
    return this.seekerProjectController.seekerProjectDetails({ skillSeekerId: id });
  }

  getDomainList() {
    return this.ownerSkillDomainController.getDetails2();
  }

  getOwnerSkillYearOfExperienceDetails() {
    return this.ownerSkillLevelAndExperienceController.getOwnerSkillYearOfExperienceDetails();
  }

  getHiringPriority() {
    return this.jobController.getHiringPriority();
  }

  addJobDetails(request:JobDto): Observable<Job> {
    return this.jobController.addJobDetails({ body: request });
  }

  publish(jobId: string): Observable<Job> {
    return this.jobController.publish({ jobId: jobId });
  }

  getSkillOwner(id:number) {
    return this.skillownerController.getById({ id: id });
  }

  downloadImage(id:number) {
    return this.skillownerController.downloadImage({ id: id });
  }

  getJobHistoryInSeeker(id:number) {
    return this.notificationController.getJobHistoryInSeeker({ ownerId: id });
  }

}
