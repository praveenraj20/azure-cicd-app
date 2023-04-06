/* tslint:disable */
/* eslint-disable */
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { SeekerModulesEntity } from './seeker-modules-entity';
import { SubRoles } from './sub-roles';
export interface SkillSeeker {
  accessModule?: string;
  active?: boolean;
  addedByAdmin?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  email?: string;
  id?: number;
  moduleAccess?: Array<SeekerModulesEntity>;
  ownerSkillDomainEntity?: OwnerSkillDomainEntity;
  phone?: string;
  primaryContactEmail?: string;
  primaryContactFullName?: string;
  primaryContactPhone?: string;
  registrationAccess?: boolean;
  secondaryContactEmail?: string;
  secondaryContactFullName?: string;
  secondaryContactPhone?: string;
  skillSeekerName?: string;
  state?: string;
  status?: string;
  subRoles?: SubRoles;
  taxIdBusinessLicense?: string;
  zipCode?: number;
}
