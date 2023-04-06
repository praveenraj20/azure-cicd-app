/* tslint:disable */
/* eslint-disable */
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
import { Task } from './task';
export interface TaskList {
  skillSeekerProjectEntity?: SkillSeekerProjectEntity;
  skillSeekerTasks?: Array<Task>;
}
