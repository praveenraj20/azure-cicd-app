/* tslint:disable */
/* eslint-disable */
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
export interface SkillSeekerTaskEntity {
  changedAt?: string;
  changedBy?: number;
  createdAt?: string;
  createdBy?: number;
  deletedAt?: string;
  id?: number;
  skillSeekerId?: number;
  skillSeekerProject?: SkillSeekerProjectEntity;
  taskDescription?: string;
  taskTitle?: string;
}
