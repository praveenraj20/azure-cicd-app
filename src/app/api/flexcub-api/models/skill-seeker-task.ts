/* tslint:disable */
/* eslint-disable */
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
export interface SkillSeekerTask {
  skillSeekerId?: number;
  skillSeekerProjectEntity?: SkillSeekerProjectEntity;
  taskDescription?: string;
  taskId?: number;
  taskTitle?: string;
}
