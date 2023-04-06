/* tslint:disable */
/* eslint-disable */
import { RequirementPhase } from './requirement-phase';
export interface JobHistory {
  businessName?: string;
  currentStage?: number;
  expByName?: string;
  hiringStatus?: string;
  jobId?: string;
  jobTitle?: string;
  levelExperience?: string;
  location?: string;
  requirementPhases?: Array<RequirementPhase>;
}
