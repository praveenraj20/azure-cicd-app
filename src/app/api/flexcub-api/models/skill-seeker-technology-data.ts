/* tslint:disable */
/* eslint-disable */
import { OwnerSkillLevelEntity } from './owner-skill-level-entity';
import { OwnerSkillRolesEntity } from './owner-skill-roles-entity';
import { OwnerSkillTechnologiesEntity } from './owner-skill-technologies-entity';
export interface SkillSeekerTechnologyData {
  baseRate?: number;
  changedAt?: string;
  changedBy?: number;
  createdAt?: string;
  createdBy?: number;
  deletedAt?: string;
  expiresOn?: string;
  id?: number;
  maxRate?: number;
  ownerSkillLevelEntity?: OwnerSkillLevelEntity;
  ownerSkillRolesEntity?: OwnerSkillRolesEntity;
  ownerSkillTechnologiesEntity?: OwnerSkillTechnologiesEntity;
  status?: string;
}
