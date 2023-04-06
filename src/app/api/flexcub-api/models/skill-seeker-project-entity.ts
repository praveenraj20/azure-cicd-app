/* tslint:disable */
/* eslint-disable */
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { SkillSeekerEntity } from './skill-seeker-entity';
import { SkillSeekerTechnologyData } from './skill-seeker-technology-data';
export interface SkillSeekerProjectEntity {
  changedAt?: string;
  changedBy?: number;
  createdAt?: string;
  createdBy?: number;
  deletedAt?: string;
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
  title?: string;
}
