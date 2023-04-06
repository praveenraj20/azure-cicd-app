/* tslint:disable */
/* eslint-disable */
import { OwnerSkillDomainEntity } from './owner-skill-domain-entity';
import { SubRoles } from './sub-roles';
export interface SkillSeekerEntity {
  addedByAdmin?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  changedAt?: string;
  changedBy?: number;
  city?: string;
  createdAt?: string;
  createdBy?: number;
  deletedAt?: string;
  email?: string;
  endDate?: string;
  id?: number;
  isActive?: boolean;
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
  startDate?: string;
  state?: string;
  status?: string;
  subRoles?: SubRoles;
  taxIdBusinessLicense?: string;
  zipCode?: number;
}
