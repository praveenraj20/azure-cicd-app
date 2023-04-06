import { Injectable } from '@angular/core';
import { SkillSeekerTask } from 'src/app/api/flexcub-api/models';
import { SeekerTaskControllerService } from 'src/app/api/flexcub-api/services';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(
    private readonly _taskService: SeekerTaskControllerService) { }

  createTask(j: SkillSeekerTask[]) {
    return this._taskService.insertSeekerTaskDetails({ body: j });
  }
}
