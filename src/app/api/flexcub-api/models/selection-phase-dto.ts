/* tslint:disable */
/* eslint-disable */
import { Job } from './job';
import { LocalTime } from './local-time';
import { RequirementPhase } from './requirement-phase';
import { SkillOwnerEntity } from './skill-owner-entity';
export interface SelectionPhaseDto {
  accepted?: boolean;
  currentStage?: number;
  dateSlotsByOwner1?: string;
  dateSlotsByOwner2?: string;
  dateSlotsByOwner3?: string;
  job?: Job;
  newSlotRequested?: boolean;
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
