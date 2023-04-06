/* tslint:disable */
/* eslint-disable */
import { HiringPriority } from './hiring-priority';
import { SkillSeekerEntity } from './skill-seeker-entity';
import { SkillSeekerProjectEntity } from './skill-seeker-project-entity';
export interface SeekerRequirement {
  baseRate?: number;
  coreTechnology?: string;
  expMonths?: string;
  expYears?: string;
  expiryDate?: string;
  federalSecurityClearance?: boolean;
  hiringPriority?: HiringPriority;
  jobDescription?: string;
  jobId?: string;
  jobLocation?: string;
  jobTitle?: string;
  maxRate?: number;
  originalOfPositions?: number;
  positionsAvailable?: number;
  remote?: number;
  screeningQuestions?: boolean;
  skillSeeker?: SkillSeekerEntity;
  skillSeekerProjectEntity?: SkillSeekerProjectEntity;
  status?: string;
  taxIdBusinessLicense?: string;
  travel?: number;
}
