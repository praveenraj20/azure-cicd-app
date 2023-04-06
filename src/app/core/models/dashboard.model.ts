import { OwnerNotificationsEntity, PartnerNotificationsEntity, SeekerNotificationsEntity } from "src/app/api/flexcub-api/models";

export interface IDMenu {
  title: string;
  crawler: string;
  route?: string;
  icon?: string;
  style: string;
}

export interface IDNotification {
  date: string | Date;
  items: OwnerNotificationsEntity[] | PartnerNotificationsEntity[] | SeekerNotificationsEntity[];
}
