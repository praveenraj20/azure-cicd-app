/* tslint:disable */
/* eslint-disable */
import { OwnerSkillStatusEntity } from './owner-skill-status-entity';
import { SkillOwnerGender } from './skill-owner-gender';
import { SkillOwnerMaritalStatus } from './skill-owner-marital-status';
import { SkillOwnerPortfolio } from './skill-owner-portfolio';
import { VisaEntity } from './visa-entity';
export interface SkillOwnerDto {
  aboutMe?: string;
  accountStatus?: boolean;
  address?: string;
  alternateEmail?: string;
  alternatePhoneNumber?: string;
  city?: string;
  dob?: string;
  expMonths?: number;
  expYears?: number;
  federalSecurityClearance?: boolean;
  firstName?: string;
  gender?: SkillOwnerGender;
  image?: Array<string>;
  lastName?: string;
  linkedIn?: string;
  maritalStatus?: SkillOwnerMaritalStatus;
  ownerSkillStatusEntity?: OwnerSkillStatusEntity;
  permanentAddress?: string;
  permanentCity?: string;
  permanentState?: string;
  phoneNumber?: string;
  portfolioUrl?: Array<SkillOwnerPortfolio>;
  primaryEmail?: string;
  rateCard?: number;
  resume?: Array<string>;
  skillOwnerEntityId?: number;
  skillPartnerId?: number;
  ssn?: string;
  state?: string;
  status?: string;
  statusVisa?: string;
  usAuthorization?: boolean;
  usc?: boolean;
  visaEndDate?: string;
  visaStartDate?: string;
  visaStatus?: VisaEntity;
}
