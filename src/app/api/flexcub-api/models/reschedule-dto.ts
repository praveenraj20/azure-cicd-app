/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
export interface RescheduleDto {
  currentStage?: number;
  dateOfInterview?: string;
  endTime?: LocalTime;
  jobId?: string;
  skillOwnerId?: number;
  startTime?: LocalTime;
  status?: string;
}
