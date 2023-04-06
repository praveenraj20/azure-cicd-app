/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
export interface SlotConfirmByOwnerDto {
  dateSlotsByOwner1?: string;
  dateSlotsByOwner2?: string;
  dateSlotsByOwner3?: string;
  endTimeSlotsByOwner1?: LocalTime;
  endTimeSlotsByOwner2?: LocalTime;
  endTimeSlotsByOwner3?: LocalTime;
  jobId?: string;
  skillOwnerEntityId?: number;
  slotsConfirmedBySeeker?: boolean;
  timeSlotsByOwner1?: LocalTime;
  timeSlotsByOwner2?: LocalTime;
  timeSlotsByOwner3?: LocalTime;
}
