/* tslint:disable */
/* eslint-disable */
import { FeedbackRate } from './feedback-rate';
import { LocalTime } from './local-time';
export interface RequirementPhaseDetailsDto {
  candidatePercentage?: FeedbackRate;
  dateOfInterview?: string;
  feedback?: string;
  interviewedBy?: string;
  jobId?: string;
  modeOfInterview?: string;
  skillOwnerId?: number;
  stage?: number;
  status?: string;
  timeOfInterview?: LocalTime;
}
