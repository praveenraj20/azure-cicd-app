/* tslint:disable */
/* eslint-disable */
import { ContentEntity } from './content-entity';
import { LocalTime } from './local-time';
export interface OwnerNotificationsEntity {
  content?: string;
  contentId?: number;
  contentObj?: ContentEntity;
  date?: string;
  dateOfInterview?: string;
  id?: number;
  jobId?: string;
  markAsRead?: boolean;
  requirementPhaseName?: string;
  skillOwnerEntityId?: number;
  stage?: number;
  timeOfInterview?: LocalTime;
  title?: string;
}
