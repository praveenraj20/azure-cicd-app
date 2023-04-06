/* tslint:disable */
/* eslint-disable */
import { RequirementPhases } from './requirement-phases';
export interface ContractDetails {
  currentStage?: number;
  experience?: string;
  isMsaCreated?: boolean;
  isPoCreated?: boolean;
  isSowCreated?: boolean;
  jobId?: string;
  msaId?: number;
  msaStatus?: string;
  nameOfOwner?: string;
  poId?: number;
  poStatus?: string;
  position?: string;
  requirementPhaseList?: Array<RequirementPhases>;
  sowId?: number;
  sowStatus?: string;
}
