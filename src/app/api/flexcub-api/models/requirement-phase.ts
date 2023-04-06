/* tslint:disable */
/* eslint-disable */
import { FeedbackRate } from './feedback-rate';
import { LocalTime } from './local-time';
export interface RequirementPhase {
  candidateRate?: FeedbackRate;
  changedAt?: string;
  changedBy?: number;
  comments?: string;
  createdAt?: string;
  createdBy?: number;
  dateOfInterview?: string;
  deletedAt?: string;
  endTimeOfInterview?: LocalTime;
  feedback?: string;
  interviewedBy?: string;
  jobId?: string;
  modeOfInterview?: string;
  requirementId?: number;
  requirementPhaseName?: string;
  rescheduled?: boolean;
  skillOwnerId?: number;
  stage?: number;
  status?: string;
  timeOfInterview?: LocalTime;
}
