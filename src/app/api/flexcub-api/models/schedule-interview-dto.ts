/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
export interface ScheduleInterviewDto {
  dateOfInterview?: string;
  endTimeOfInterview?: LocalTime;
  interviewedBy?: string;
  jobId?: string;
  modeOfInterview?: string;
  skillOwnerId?: number;
  stage?: number;
  timeOfInterview?: LocalTime;
}
