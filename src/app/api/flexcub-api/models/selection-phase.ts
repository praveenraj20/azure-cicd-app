/* tslint:disable */
/* eslint-disable */
import { Job } from './job';
import { LocalTime } from './local-time';
import { RequirementPhase } from './requirement-phase';
import { SkillOwnerEntity } from './skill-owner-entity';
export interface SelectionPhase {
  accepted?: boolean;
  changedAt?: string;
  changedBy?: number;
  createdAt?: string;
  createdBy?: number;
  currentStage?: number;
  dateSlotsByOwner1?: string;
  dateSlotsByOwner2?: string;
  dateSlotsByOwner3?: string;
  deletedAt?: string;
  endTimeSlotsByOwner1?: LocalTime;
  endTimeSlotsByOwner2?: LocalTime;
  endTimeSlotsByOwner3?: LocalTime;
  interviewAccepted?: boolean;
  job?: Job;
  joinedOn?: string;
  mailSent?: boolean;
  newSlotRequested?: boolean;
  rate?: number;
  rejectedOn?: string;
  requirementPhase?: Array<RequirementPhase>;
  selectionId?: number;
  showSelectionBar?: boolean;
  showTicksValues?: boolean;
  skillOwnerEntity?: SkillOwnerEntity;
  slotConfirmed?: boolean;
  timeSlotsByOwner1?: LocalTime;
  timeSlotsByOwner2?: LocalTime;
  timeSlotsByOwner3?: LocalTime;
}
