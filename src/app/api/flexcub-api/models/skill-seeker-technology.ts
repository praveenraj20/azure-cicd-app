/* tslint:disable */
/* eslint-disable */
import { OwnerSkillLevelEntity } from './owner-skill-level-entity';
import { OwnerSkillRolesEntity } from './owner-skill-roles-entity';
import { OwnerSkillTechnologiesEntity } from './owner-skill-technologies-entity';
export interface SkillSeekerTechnology {
  baseRate?: number;
  expiresOn?: string;
  id?: number;
  maxRate?: number;
  ownerSkillLevelEntity?: OwnerSkillLevelEntity;
  ownerSkillRolesEntity?: OwnerSkillRolesEntity;
  ownerSkillTechnologiesEntity?: OwnerSkillTechnologiesEntity;
  status?: string;
}
