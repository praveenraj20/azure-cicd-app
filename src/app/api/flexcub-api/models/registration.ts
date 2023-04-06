/* tslint:disable */
/* eslint-disable */
import { Roles } from './roles';
import { SeekerModulesEntity } from './seeker-modules-entity';
import { WorkForceStrength } from './work-force-strength';
export interface Registration {
  accountStatus?: boolean;
  businessName?: string;
  city?: string;
  contactPhone?: string;
  emailId?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  loginCount?: number;
  mailStatus?: string;
  modulesAccess?: Array<SeekerModulesEntity>;
  password?: string;
  roles?: Roles;
  state?: string;
  subRoles?: number;
  taxIdBusinessLicense?: string;
  timeSheetAccess?: boolean;
  workForceStrength?: WorkForceStrength;
}
