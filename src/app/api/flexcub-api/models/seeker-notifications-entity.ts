/* tslint:disable */
/* eslint-disable */
import { ContentEntity } from './content-entity';
export interface SeekerNotificationsEntity {
  content?: string;
  contentId?: number;
  contentObj?: ContentEntity;
  date?: string;
  id?: number;
  jobId?: string;
  markAsRead?: boolean;
  ownerId?: number;
  skillOwnerId?: number;
  skillSeekerEntityId?: number;
  stage?: number;
  taxIdBusinessLicense?: string;
  title?: string;
}
