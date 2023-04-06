/* tslint:disable */
/* eslint-disable */
import { Efforts } from './efforts';
export interface OwnerTimeSheet {
  approved?: boolean;
  efforts?: Array<Efforts>;
  endDate?: string;
  hours?: string;
  skillOwnerEntityId?: number;
  skillSeekerEntityId?: number;
  skillSeekerProjectEntityId?: number;
  startDate?: string;
  timeSheetId?: number;
  totalHours?: string;
}
