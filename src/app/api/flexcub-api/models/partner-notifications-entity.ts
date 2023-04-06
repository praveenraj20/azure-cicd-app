/* tslint:disable */
/* eslint-disable */
import { ContentEntity } from './content-entity';
import { LocalTime } from './local-time';
export interface PartnerNotificationsEntity {
  content?: string;
  contentId?: number;
  contentObj?: ContentEntity;
  date?: string;
  dateOfInterview?: string;
  id?: number;
  jobId?: string;
  markAsRead?: boolean;
  ownerId?: number;
  requirementPhaseName?: string;
  skillPartnerEntityId?: number;
  stage?: number;
  timeOfInterview?: LocalTime;
  title?: string;
}
