// import { SkillSeekerTask } from 'src/app/api/flexcub-api/models';

export interface ITimesheetSelectionDto {
  project: number;
  task: string | number;
  timeSheetId: number;
}

export interface ITimesheetMatrix {
  duration: number;
  weekEnd: boolean;
}

export interface IWeekOptions {
  day: string;
  date: Date | string;
  id: number;
  weekEnd: boolean;
}

export interface ITimesheetTable {
  title: string;
  id: string | number;
  tasks: Array<ITimesheetTableTask>;
}

export interface ITimesheetTableTask {
  title: string;
  id: string | number;
  duration: Array<ITimesheetMatrix>;
}

export interface IProjects {
  timeSheetId?: number;
  id: number;
  title: string;
  summary?: string;
  seekerId: number;
  tasks: ITasks[];
  /** To hold the original values receiving from the projects API.  */
  _tasks?: any[];
  startDate?: Date | string;
  endDate?: Date | string;
  approved?: boolean;
  totalHours?:number;
  firstName?:string;
}

export interface ITasks {
  id?: number;
  title: string;
  duration?: any[];
  description?: string;
}
export interface ISubRoles {
  id: number;
  subRoleDescription: string;
}

export interface ISkillSeeker {
  deletedAt?: any;
  createdAt: Date;
  createdBy?: any;
  changedAt: Date;
  changedBy?: any;
  id: number;
  skillSeekerName: string;
  ownerSkillDomainEntity?: any;
  addressLine1?: any;
  addressLine2?: any;
  state: string;
  city: string;
  zipCode: number;
  phone: string;
  email: string;
  primaryContactFullName: string;
  primaryContactEmail?: any;
  primaryContactPhone?: any;
  secondaryContactFullName?: any;
  secondaryContactEmail?: any;
  secondaryContactPhone?: any;
  status?: any;
  startDate?: any;
  endDate?: any;
  taxIdBusinessLicense: string;
  subRoles: ISubRoles;
  isActive: boolean;
  addedByAdmin: boolean;
}

export interface IOwnerSkillDomainEntity {
  deletedAt?: any;
  createdAt: Date;
  createdBy: number;
  changedAt: Date;
  changedBy: number;
  domainId: number;
  domainValues: string;
  priority: number;
}

export interface ISkillSeekerTechnologyData {
  deletedAt?: any;
  createdAt: Date;
  createdBy?: any;
  changedAt: Date;
  changedBy?: any;
  id: number;
  ownerSkillTechnologiesEntity?: any;
  ownerSkillRolesEntity?: any;
  ownerSkillLevelEntity?: any;
  baseRate: number;
  maxRate: number;
  expiresOn?: any;
  status?: any;
}

export interface IGetProjectDto {
  id: number;
  skillSeeker: ISkillSeeker;
  ownerSkillDomainEntity: IOwnerSkillDomainEntity;
  title: string;
  summary: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  secondaryContactEmail: string;
  secondaryContactPhone: string;
  startDate: string;
  endDate: string;
  skillSeekerTechnologyData: ISkillSeekerTechnologyData[];
}

export interface IAddTimesheetDto {
  timeSheetId?: number;
  skillOwnerEntityId: number;
  skillSeekerEntityId: number;
  skillSeekerProjectEntityId: number;
  efforts: { task: string; hours: string }[];
  startDate: Date | string;
  endDate: Date | string;
  approved?: boolean;
}

export interface IFetchGetTimesheetDto {
  weekStartDate: Date | string;
  ownerId: number;
}
