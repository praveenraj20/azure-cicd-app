/* tslint:disable */
/* eslint-disable */
import { Roles } from './roles';
import { WorkForceStrength } from './work-force-strength';
export interface RegistrationEntity {
  accountStatus?: boolean;
  address?: string;
  businessName?: string;
  businessPhone?: string;
  city?: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: string;
  customTech?: string;
  domainId?: number;
  emailId?: string;
  excelId?: string;
  firstName?: string;
  id?: number;
  isAccountActive?: boolean;
  lastName?: string;
  loginCount?: number;
  mailStatus?: string;
  password?: string;
  roles?: Roles;
  state?: string;
  taxIdBusinessLicense?: string;
  technologyIds?: string;
  token?: string;
  trial?: boolean;
  trialExpiredOn?: string;
  workForceStrength?: WorkForceStrength;
}
