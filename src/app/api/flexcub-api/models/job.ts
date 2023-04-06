/* tslint:disable */
/* eslint-disable */
import { HiringPriority } from './hiring-priority';
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { OwnerSkillTechnologiesEntity } from './owner-skill-technologies-entity';
import { OwnerSkillYearOfExperience } from './owner-skill-year-of-experience';
import { SkillSeekerEntity } from './skill-seeker-entity';
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
export interface Job {
  baseRate?: number;
  changedAt?: string;
  changedBy?: number;
  coreTechnology?: string;
  createdAt?: string;
  createdBy?: number;
  customTech?: string;
  deletedAt?: string;
  expiryDate?: string;
  federalSecurityClearance?: boolean;
  hiringPriority?: HiringPriority;
  jobDescription?: string;
  jobId?: string;
  jobLocation?: string;
  jobTitle?: string;
  maxRate?: number;
  numberOfPositions?: number;
  originalNumberOfPosition?: number;
  ownerSkillDomainEntity?: OwnerSkillDomainEntity;
  ownerSkillTechnologiesEntity?: Array<OwnerSkillTechnologiesEntity>;
  ownerSkillYearOfExperience?: OwnerSkillYearOfExperience;
  project?: string;
  remote?: number;
  screeningQuestions?: boolean;
  seekerProject?: SkillSeekerProjectEntity;
  skillSeeker?: SkillSeekerEntity;
  status?: string;
  taxIdBusinessLicense?: string;
  travel?: number;
}
