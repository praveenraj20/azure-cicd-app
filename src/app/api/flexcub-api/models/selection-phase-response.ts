/* tslint:disable */
/* eslint-disable */
import { LocalTime } from './local-time';
import { RequirementPhase } from './requirement-phase';
export interface SelectionPhaseResponse {
  accepted?: boolean;
  currentStage?: number;
  dateSlotsByOwner1?: string;
  dateSlotsByOwner2?: string;
  dateSlotsByOwner3?: string;
  experience?: string;
  imageAvailable?: boolean;
  interviewAccepted?: boolean;
  jobId?: string;
  jobTitle?: string;
  msaCreated?: boolean;
  newSlotRequested?: boolean;
  poCreated?: boolean;
  rate?: number;
  requirementPhaseList?: Array<RequirementPhase>;
  resumeAvailable?: boolean;
  selectionId?: number;
  showSelectionBar?: boolean;
  showTicksValues?: boolean;
  skillOwnerId?: number;
  skillOwnerName?: string;
  slotConfirmed?: boolean;
  sowCreated?: boolean;
  timeSlotsByOwner1?: LocalTime;
  timeSlotsByOwner2?: LocalTime;
  timeSlotsByOwner3?: LocalTime;
}
