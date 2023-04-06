/* tslint:disable */
/* eslint-disable */
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { SkillSeekerEntity } from './skill-seeker-entity';
import { SkillSeekerTask } from './skill-seeker-task';
import { SkillSeekerTechnologyData } from './skill-seeker-technology-data';
export interface SkillSeekerProject {
  endDate?: string;
  id?: number;
  ownerSkillDomainEntity?: OwnerSkillDomainEntity;
  primaryContactEmail?: string;
  primaryContactPhone?: string;
  secondaryContactEmail?: string;
  secondaryContactPhone?: string;
  skillSeeker?: SkillSeekerEntity;
  skillSeekerTechnologyData?: Array<SkillSeekerTechnologyData>;
  startDate?: string;
  summary?: string;
  taskData?: Array<SkillSeekerTask>;
  title?: string;
}
