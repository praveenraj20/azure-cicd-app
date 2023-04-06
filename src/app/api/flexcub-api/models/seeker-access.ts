/* tslint:disable */
/* eslint-disable */
import { SeekerModulesEntity } from './seeker-modules-entity';
import { SubRoles } from './sub-roles';
export interface SeekerAccess {
  accessId?: string;
  active?: boolean;
  seekerModulesEntity?: SeekerModulesEntity;
  subRoles?: SubRoles;
  taxIdBusinessLicense?: string;
}
