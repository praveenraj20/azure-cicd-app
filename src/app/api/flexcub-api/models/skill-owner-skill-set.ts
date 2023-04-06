/* tslint:disable */
/* eslint-disable */
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { OwnerSkillLevelEntity } from './owner-skill-level-entity';
import { OwnerSkillRolesEntity } from './owner-skill-roles-entity';
import { OwnerSkillTechnologiesEntity } from './owner-skill-technologies-entity';
export interface SkillOwnerSkillSet {
  experience?: string;
  lastUsed?: string;
  ownerSkillDomainEntity?: OwnerSkillDomainEntity;
  ownerSkillLevelEntity?: OwnerSkillLevelEntity;
  ownerSkillRolesEntity?: OwnerSkillRolesEntity;
  ownerSkillSetId?: number;
  ownerSkillTechnologiesEntity?: OwnerSkillTechnologiesEntity;
  skillOwnerEntityId?: number;
}
